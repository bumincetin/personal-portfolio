import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey } from '@/lib/gemini-config';

// ALLOW FUNCTION TO RUN UP TO 60 SECONDS (Max for Hobby Plan)
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

// Optimized list: Use the fastest stable model first.
// If 1.5-flash fails, it's unlikely others will succeed unless it's a specific overload issue.
const MODEL_FALLBACKS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",        // Current standard for speed/cost
  "gemini-2.0-flash-exp",    // Try experimental fast model if 1.5 fails
];

const generationConfig = {
  temperature: 0.2,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileContent, statementType, fileName } = body;
    
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

    // 2. Construct Enhanced Prompt for Financial Analysis
    const prompt = `
      You are a Senior Financial Analyst with expertise in IFRS, GAAP, and international accounting standards. Analyze the financial statement "${fileName}" (Type: ${statementType}).

      CRITICAL REQUIREMENTS:
      1. DETECT DOCUMENT TYPE: First, identify if this is a Trial Balance (Mizan / Bilancio di Verifica). If it is:
         - Convert it to an IFRS-compliant Balance Sheet structure
         - Group accounts into: Current Assets, Non-Current Assets, Current Liabilities, Non-Current Liabilities, Equity
         - Apply proper IFRS classifications (e.g., Property, Plant & Equipment, Intangible Assets, etc.)
         - Calculate totals for each section
         - Note in the summary that a Trial Balance was converted to IFRS Balance Sheet format

      2. DETECT DOCUMENT LANGUAGE: Identify if the document is in English (en), Turkish (tr), or Italian (it) based on content

      3. EXTRACT ALL METRICS: Parse ALL financial values, dates, periods, and line items from the document. Be extremely thorough - extract every number, account name, and classification.

      4. IDENTIFY COMPARATIVES: Look for "Previous Year", "Prior Period", "Önceki Dönem", "Periodo Precedente", "Prior Year", "PY", "Önceki Yıl" columns or sections

      5. CALCULATE COMPREHENSIVE RATIOS: Calculate a wide range of financial ratios. For each ratio, you MUST:
         - Calculate the exact value using the formula
         - List EXACT source data locations with full context
         - Determine status: "good", "warning", or "bad"
         - Provide detailed interpretation

      6. TRACK DATA SOURCES: For EVERY ratio, the sourceData array must contain specific references.

      7. GENERATE DETAILED INSIGHTS: Provide at least 5-7 comprehensive insights covering financial health, liquidity, profitability, leverage, efficiency, risk, and growth.

      8. IDENTIFY UNPARSED SECTIONS: List ANY parts that couldn't be understood.

      -------------------------------------------------------------------------
      NEW REQUIREMENT: MIZAN (TRIAL BALANCE) ACCOUNTING LOGIC
      -------------------------------------------------------------------------
      If analyzing a "Mizan" (Trial Balance), you must strictly distinguish between MAIN ACCOUNTS (Ana Hesaplar) and SUB-ACCOUNTS (Tali/Muavin Hesaplar).
      - LOGIC: A code like "100" or "600" is a MAIN CATEGORY. A code like "100.001" or "600.01" is a SUB-CATEGORY.
      - AGGREGATION RULE: If the document contains both the Main Account total AND the Sub-Account details, ONLY USE THE MAIN ACCOUNT TOTAL for calculations to avoid double counting.
      - Example: If "100 Kasa" is 1000 and "100.01 TL Kasa" is 1000, Total Cash is 1000, NOT 2000.
      
      -------------------------------------------------------------------------
      NEW REQUIREMENT: INTERACTIVE DROPDOWN TRACEABILITY
      -------------------------------------------------------------------------
      You must generate a "traceabilityMap" object. This is a dictionary where the keys are standard financial concepts (e.g., 'total_assets', 'gross_profit', 'current_liabilities') and the value is an array of the specific rows used to calculate that number.
      - This allows the user to click a dropdown menu item (e.g., "Total Assets") and see the exact lines in the document you used.
      - Include the raw text and the value for each line in this map.

      OUTPUT FORMAT (STRICT JSON - NO MARKDOWN):
      {
        "docLanguage": "en" | "tr" | "it",
        "summary": "A comprehensive executive summary (4-6 sentences)...",
        
        "traceabilityMap": {
          "total_assets": [ { "rowText": "100 KASA ... 50.000", "value": 50000 }, { "rowText": "102 BANKALAR ... 100.000", "value": 100000 } ],
          "total_liabilities": [ { "rowText": "300 BANKA KREDİLERİ ... 20.000", "value": 20000 } ],
          "gross_revenue": [ { "rowText": "600 YURTİÇİ SATIŞLAR ... 500.000", "value": 500000 } ],
          "net_income": [ { "rowText": "590 DÖNEM NET KARI ... 45.000", "value": 45000 } ]
          // Add keys for all major calculated fields found in the document
        },

        "ratios": [
          {
            "id": "current-ratio",
            "name": "Current Ratio",
            "value": 1.85,
            "unit": "x",
            "category": "liquidity",
            "status": "good",
            "interpretation": "Brief interpretation...",
            "formula": "Current Assets / Current Liabilities",
            "sourceData": [ "Total Current Assets: €250,000", "Total Current Liabilities: €135,000" ]
          }
        ],
        "insights": [ "Detailed insight 1...", "Detailed insight 2..." ],
        "graphData": {
          "available": true,
          "title": "Revenue vs Net Income",
          "labels": ["Previous", "Current"],
          "series": [
            { "label": "Revenue", "data": [100000, 120000] },
            { "label": "Net Income", "data": [15000, 18000] }
          ]
        },
        "unparsed": [
          {
            "content": "Exact text...",
            "location": "Page 2...",
            "reason": "Unclear formatting..."
          }
        ]
      }

      STATEMENT TYPE SPECIFIC REQUIREMENTS:
      - Balance Sheet: Calculate Current Ratio, Quick Ratio, Debt-to-Equity, etc.
      - Income Statement: Calculate Gross Margin, Net Margin, EBITDA Margin, etc.
      - Trial Balance: Convert to IFRS Balance Sheet first, then calculate Balance Sheet ratios.

      CALCULATION RULES:
      - Use standard formulas.
      - Round values to 2 decimal places.
      - If comparative data exists, calculate trends.
      - If data is incomplete, note it in unparsed.

      DOCUMENT CONTENT (first 50000 characters):
      ${fileContent ? fileContent.substring(0, 50000) : "NO CONTENT PROVIDED"}
    `;

    // 3. Try Models with Fallback Strategy using new API structure
    let lastError: any = null;
    
    for (const modelName of MODEL_FALLBACKS) {
      try {
        console.log(`Attempting analysis with model: ${modelName}`);
        
        // Use new @google/genai API structure (matching official documentation)
        const response = await genAI.models.generateContent({
          model: modelName,
          contents: prompt,
          ...generationConfig // Spread config properties if supported
        });
        
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