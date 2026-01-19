import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey } from '@/lib/gemini-config';

// ALLOW FUNCTION TO RUN UP TO 60 SECONDS (Max for Hobby Plan)
// Note: This must be exported at the route level for Vercel to recognize it
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure Node.js runtime

// Timeout wrapper for API calls (45 seconds per model attempt to leave buffer)
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    )
  ]);
}

// Optimized list: Use the fastest stable model first.
// If 1.5-flash fails, it's unlikely others will succeed unless it's a specific overload issue.
const MODEL_FALLBACKS = [
  "gemini-2.0-flash-exp",    // Try experimental fast model if 1.5 fails
  "gemini-2.5-flash",        // Latest fast model
];

const generationConfig = {
  temperature: 0.2,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 3072, // Further reduced to speed up generation (still sufficient for analysis)
  responseMimeType: "application/json",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileContent, statementType, fileName } = body;
    
    // 0. Validate file size before processing
    if (!fileContent || fileContent.length === 0) {
      return NextResponse.json(
        { error: 'File content is empty. Please upload a valid file.' },
        { status: 400 }
      );
    }
    
    // Warn if file is very large (but still process it)
    if (fileContent.length > 50000) {
      console.warn(`Large file detected: ${fileContent.length} characters. Processing may be slow.`);
    }
    
    // 1. Get and validate API Key
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'Gemini API Key missing. Please either:\n1. Set GEMINI_API_KEY environment variable, or\n2. Add "api_key" field to the credentials JSON file.\n\nGet your API key from: https://aistudio.google.com/apikey' 
        }, 
        { status: 500 }
      );
    }

    // Initialize Gemini with API key using new @google/genai package
    const genAI = new GoogleGenAI({ apiKey });

    // 2. Construct Optimized Compact Prompt
    const prompt = `Analyze "${fileName}" (${statementType}). IFRS/GAAP financial analyst.

1.Trial Balance?→IFRS Balance Sheet: Current/Non-Current Assets,Liabilities,Equity
2.Language:Detect en/tr/it from document. ALL OUTPUT (summary,insights,interpretations) MUST be in detected language.
3.Extract:values,dates,line items 4.Comparatives:"Previous Year","Prior Period","Önceki Dönem","PY"
5.CALCULATE RATIOS:You MUST calculate actual ratio values from extracted data. For each ratio:
   - Extract the required values from document (e.g., Current Assets, Current Liabilities)
   - Calculate: value = numerator/denominator (e.g., Current Ratio = Current Assets / Current Liabilities)
   - Include in sourceData: specific row references with exact rowText and values used
   - Determine status: good (>1.5), warning (1.0-1.5), bad (<1.0) for liquidity ratios
   - Write interpretation in detected language
6.Insights:5-7 covering health,liquidity,profitability,leverage,efficiency,risk,growth
7.Unparsed sections

TRIAL BALANCE:Main(100,600) vs sub(100.001). Use MAIN totals only.
TRACEABILITY:traceabilityMap keys('total_assets','gross_profit')→source rows{rowText,value}

CRITICAL RATIO CALCULATION:
- For each ratio, you MUST calculate the actual numeric value from the document data
- sourceData MUST list every specific row used with format: "Row X: [exact row text] [value]"
- Example for Current Ratio:
  sourceData: ["Row 5: 100 KASA 50.000", "Row 12: 102 BANKALAR 100.000", "Row 20: 300 BANKA KREDİLERİ 80.000", "Calculated: Current Assets=150.000, Current Liabilities=80.000"]
- Include at least 3-5 specific row references per ratio

REQUIRED RATIOS (calculate ALL that apply):
Balance Sheet: Current Ratio, Quick Ratio, Debt-to-Equity, Equity Ratio, Working Capital
Income Statement: Gross Margin, Net Margin, EBITDA Margin, Operating Margin, ROE, ROA

OUTPUT JSON:
{"docLanguage":"en|tr|it","summary":"4-6 sentences IN DETECTED LANGUAGE","traceabilityMap":{"total_assets":[{"rowText":"100 KASA ... 50.000","value":50000}]},"ratios":[{"id":"current-ratio","name":"Current Ratio","value":1.85,"unit":"x","category":"liquidity","status":"good","interpretation":"IN DETECTED LANGUAGE","formula":"Current Assets/Current Liabilities","sourceData":["Row 5: 100 KASA 50.000","Row 12: 102 BANKALAR 100.000","Row 20: 300 BANKA KREDİLERİ 80.000","Calculated: Current Assets=150.000, Current Liabilities=80.000, Ratio=1.875"]}],"insights":["IN DETECTED LANGUAGE"],"graphData":{"available":true,"title":"IN DETECTED LANGUAGE","labels":["Previous","Current"],"series":[{"label":"Revenue","data":[0,0]}]},"unparsed":[{"content":"...","location":"...","reason":"..."}]}

RATIO FORMULAS:
- Current Ratio = Current Assets / Current Liabilities
- Quick Ratio = (Current Assets - Inventory) / Current Liabilities
- Debt-to-Equity = Total Debt / Total Equity
- Gross Margin = (Revenue - COGS) / Revenue * 100
- Net Margin = Net Income / Revenue * 100
Rules:Calculate actual values, round to 2 decimals, note trends if comparatives exist.

DOCUMENT:
${fileContent ? fileContent.substring(0, 20000) : "NO CONTENT"}
`;

    // 3. Try Models with Fallback Strategy using new API structure
    let lastError: any = null;
    
    for (const modelName of MODEL_FALLBACKS) {
      try {
        console.log(`Attempting analysis with model: ${modelName}`);
        
        // Wrap API call with timeout (30 seconds per attempt for faster fallback)
        const response = await withTimeout(
          genAI.models.generateContent({
            model: modelName,
            contents: prompt,
            ...generationConfig // Spread config properties if supported
          }),
          30000, // 30 second timeout per model attempt (faster fallback)
          `Model ${modelName} timed out after 30 seconds`
        );
        
        // Extract text from response - check different possible structures
        let text: string;
        if (typeof response.text === 'string') {
          text = response.text;
        } else if (response.text && typeof response.text === 'object' && 'text' in response.text) {
          text = (response.text as any).text;
        } else if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
          text = response.candidates[0].content.parts[0].text;
        } else {
          text = String(response);
        }
        
        if (!text || text.trim().length === 0) {
          throw new Error('Empty response from model');
        }
        
        // Clean the response text (remove markdown code blocks if present)
        let cleanText = text.trim();
        // Remove markdown code blocks
        cleanText = cleanText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
        // Remove any leading/trailing whitespace or newlines
        cleanText = cleanText.replace(/^\s*[\r\n]+/, '').replace(/[\r\n]+\s*$/, '');
        
        // Parse JSON with better error handling
        let data;
        try {
          data = JSON.parse(cleanText);
        } catch (parseError: any) {
          console.error('JSON Parse Error:', parseError);
          console.error('Response text:', cleanText.substring(0, 500));
          throw new Error(`Failed to parse AI response as JSON: ${parseError.message}. Response may not be valid JSON.`);
        }
        
        // Validate required fields
        if (!data.ratios || !Array.isArray(data.ratios)) {
          data.ratios = [];
        } else {
          // Validate each ratio has required fields
          data.ratios = data.ratios.map((ratio: any) => ({
            ...ratio,
            value: typeof ratio.value === 'number' ? ratio.value : 0,
            sourceData: Array.isArray(ratio.sourceData) && ratio.sourceData.length > 0 
              ? ratio.sourceData 
              : ['No source data provided'],
            interpretation: ratio.interpretation || 'No interpretation provided',
            formula: ratio.formula || 'Formula not provided',
            status: ratio.status || 'warning',
          }));
        }
        if (!data.insights || !Array.isArray(data.insights)) {
          data.insights = [];
        }
        if (!data.unparsed || !Array.isArray(data.unparsed)) {
          data.unparsed = [];
        }
        if (!data.graphData) {
          data.graphData = { available: false, title: '', labels: [], series: [] };
        }
        if (!data.docLanguage) {
          data.docLanguage = 'en'; // Default to English
        }
        
        return NextResponse.json(data);
        
      } catch (error: any) {
        console.warn(`Failed with ${modelName}:`, error.message);
        
        // If it's a timeout, try the next model immediately
        if (error.message.includes("timed out") || error.message.includes("timeout")) {
          lastError = error;
          continue; // Try next model
        }
        
        // If it's a "Not Found" error (404), try the next model.
        // If it's a "Safety" block or "Auth" error, stop and report it.
        if (error.message.includes("404") || error.message.includes("not found")) {
          lastError = error;
          continue; // Try next model
        } else {
          // Fatal error (Safety, Quota, Key Invalid) -> Throw immediately
          throw error;
        }
      }
    }

    // If loop finishes without success
    throw lastError || new Error("All model attempts failed. Please check your API Key region and ensure you have access to Gemini 1.5 models.");

  } catch (error: any) {
    console.error('Final API Error:', error);
    
    // Detailed error messaging for the frontend
    let errorMessage = "Analysis Failed";
    
    if (error.message.includes("404")) errorMessage = "Model Not Found (Check API Key Region)";
    if (error.message.includes("403")) errorMessage = "Invalid API Key or Quota Exceeded";
    if (error.message.includes("Safety")) errorMessage = "AI Safety Block (Content flagged)";
    
    return NextResponse.json(
      { error: `${errorMessage}: ${error.message}` }, 
      { status: 500 }
    );
  }
}