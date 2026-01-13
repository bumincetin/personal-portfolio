import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getGeminiApiKey } from '@/lib/gemini-config';

// List of models to try in order of preference
// Updated to use latest Gemini 2.x and 1.5 model names
const MODEL_FALLBACKS = [
  "gemini-2.5-flash",        // Latest fast model (Gemini 2.5)
  "gemini-2.0-flash",        // Gemini 2.0 fast model
  "gemini-1.5-flash",        // Fast and efficient model (1.5 series)
  "gemini-1.5-pro",          // More capable model for complex analysis
  "gemini-1.5-flash-002",    // Specific stable version
  "gemini-1.5-pro-002"       // Specific stable version of pro
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
    const prompt = `You are a Senior Financial Analyst with expertise in IFRS, GAAP, and international accounting standards. Analyze the financial statement "${fileName}" (Type: ${statementType}).

CRITICAL REQUIREMENTS:
1. DETECT DOCUMENT LANGUAGE: Identify if the document is in English (en), Turkish (tr), or Italian (it) based on content
2. EXTRACT ALL METRICS: Parse all financial values, dates, periods, and line items from the document
3. IDENTIFY COMPARATIVES: Look for "Previous Year", "Prior Period", "Önceki Dönem", "Periodo Precedente", "Prior Year", "PY" columns or sections
4. CALCULATE RATIOS: Use standard financial ratio formulas. For each ratio, you MUST:
   - Calculate the exact value using the formula
   - List EXACT source data locations (e.g., "Total Current Assets: €250,000 (Balance Sheet, Assets section, line 15)", "Total Current Liabilities: €135,000 (Balance Sheet, Liabilities section, line 28)")
   - Determine status: "good" if above industry average, "warning" if near average, "bad" if below average
5. TRACK DATA SOURCES: For EVERY ratio, the sourceData array must contain specific references like:
   - "Revenue: €1,200,000 (Income Statement, line 5, Current Period column)"
   - "Cost of Goods Sold: €720,000 (Income Statement, line 12, Current Period column)"
6. IDENTIFY UNPARSED SECTIONS: List ANY parts that couldn't be understood with:
   - Exact content/text that was unclear
   - Location (page number, section, line numbers if available)
   - Reason why it couldn't be parsed (e.g., "Missing labels", "Unclear formatting", "Language not recognized")

OUTPUT FORMAT (STRICT JSON - NO MARKDOWN, NO CODE BLOCKS, NO EXPLANATIONS):
{
  "docLanguage": "en" | "tr" | "it",
  "summary": "A comprehensive executive summary (2-3 sentences) analyzing the financial health, trends, and key findings. Write in the detected document language.",
  "ratios": [
    {
      "id": "current-ratio",
      "name": "Current Ratio" | "Cari Oran" | "Indice Corrente",
      "value": 1.85,
      "unit": "x" | "%" | "€" | "days",
      "category": "liquidity" | "profitability" | "efficiency" | "leverage",
      "status": "good" | "warning" | "bad",
      "interpretation": "Brief interpretation explaining what this ratio means for the company, in the document language",
      "formula": "Current Assets / Current Liabilities",
      "sourceData": [
        "Total Current Assets: €250,000 (Balance Sheet, Assets section, line 15, Current Period)",
        "Total Current Liabilities: €135,000 (Balance Sheet, Liabilities section, line 28, Current Period)"
      ]
    }
  ],
  "insights": [
    "Key insight 1 explaining financial health, trends, or risks (in document language)",
    "Key insight 2 with actionable observations (in document language)",
    "Key insight 3 highlighting opportunities or concerns (in document language)"
  ],
  "graphData": {
    "available": true | false,
    "title": "Revenue vs Net Income" | "Gelir vs Net Kar" | "Ricavi vs Utile Netto",
    "labels": ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"] | ["Previous Period", "Current Period"],
    "series": [
      { "label": "Revenue" | "Gelir" | "Ricavi", "data": [100000, 120000, 115000, 140000] },
      { "label": "Net Income" | "Net Kar" | "Utile Netto", "data": [15000, 18000, 17000, 22000] }
    ]
  },
  "unparsed": [
    {
      "content": "Exact text or section that couldn't be parsed",
      "location": "Page 2, Section 3, Lines 45-50" | "Row 15-20, Column D",
      "reason": "Unclear formatting or missing labels" | "Language not recognized" | "Incomplete data"
    }
  ]
}

STATEMENT TYPE SPECIFIC REQUIREMENTS:
- Balance Sheet: Calculate Current Ratio, Quick Ratio, Debt-to-Equity, Asset Turnover. Graph: Total Assets vs Total Liabilities (or Current Assets vs Current Liabilities if time series available)
- Income Statement: Calculate Gross Margin, Net Margin, EBITDA Margin, Operating Margin, ROE. Graph: Revenue vs Net Income over periods (or Revenue vs Expenses if only 2 periods)
- Cash Flow: Calculate Operating Cash Flow Ratio, Free Cash Flow, Cash Conversion Cycle. Graph: Operating Cash Flow vs Free Cash Flow over periods

CALCULATION RULES:
- For ratios, use standard formulas (e.g., Current Ratio = Current Assets / Current Liabilities)
- Round values to 2 decimal places for ratios, whole numbers for currency
- If comparative data exists, calculate trends and include in insights
- If data is incomplete, note it in unparsed and set graphData.available = false

DOCUMENT CONTENT (first 100000 characters):
${fileContent ? fileContent.substring(0, 100000) : "NO CONTENT PROVIDED"}

CRITICAL: 
- Return ONLY valid JSON, no markdown, no code blocks, no explanations outside JSON
- All text (summary, insights, interpretations) must be in the detected document language
- sourceData MUST list exact locations where each value was found
- unparsed MUST include ALL sections that couldn't be understood
- If no comparative data, set graphData.available = false and use single period data
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