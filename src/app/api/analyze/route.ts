import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// List of models to try in order of preference
// This prevents the "404 Model Not Found" error if an alias is deprecated or region-locked
const MODEL_FALLBACKS = [
  "gemini-1.5-flash",        // Standard alias
  "gemini-1.5-flash-latest", // Bleeding edge
  "gemini-1.5-flash-001",    // Specific stable version
  "gemini-1.5-flash-002",    // Newer stable version
  "gemini-pro"               // Fallback to 1.0 if all else fails
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
    
    // 1. Critical Check: API Key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Server API Key missing. Please set GEMINI_API_KEY in Vercel Environment Variables.' }, 
        { status: 500 }
      );
    }

    // 2. Construct Prompt
    const prompt = `
      ROLE:
      Senior Financial Analyst. Analyze the "${fileName}" (${statementType}).

      TASK:
      1. EXTRACT METRICS: Identify key values for the current period.
      2. FIND COMPARATIVES: Look for "Previous Year" or "Prior Period" columns to create a comparison.
      3. CALCULATE RATIOS: Use standard formulae.
      4. GENERATE INSIGHTS: Executive summary & risk assessment.

      OUTPUT SCHEMA (STRICT JSON):
      {
        "docLanguage": "en" | "tr" | "it",
        "summary": "Executive summary string",
        "ratios": [
          {
            "id": "string",
            "name": "string",
            "value": number,
            "unit": "string",
            "category": "liquidity" | "profitability" | "efficiency" | "leverage",
            "status": "good" | "warning" | "bad",
            "interpretation": "string",
            "formula": "string",
            "sourceData": ["string"]
          }
        ],
        "insights": ["string"],
        "graphData": {
          "available": boolean,
          "title": "Revenue vs Expenses (or Assets vs Liab)",
          "labels": ["Previous Period", "Current Period"],
          "series": [
            { "label": "Metric A (e.g. Revenue)", "data": [100, 120] },
            { "label": "Metric B (e.g. Net Income)", "data": [20, 25] }
          ]
        },
        "unparsed": [{ "content": "string", "location": "string", "reason": "string" }]
      }

      INSTRUCTIONS:
      - If Previous Year data is missing, set graphData.available = false.
      - For "graphData", choose the most important 2 metrics for the statement type (e.g., Revenue & Net Income for Income Statement, Assets & Liabilities for Balance Sheet).
      
      INPUT:
      ${fileContent ? fileContent.substring(0, 50000) : "NO CONTENT"}
    `;

    // 3. Try Models with Fallback Strategy
    let lastError = null;
    
    for (const modelName of MODEL_FALLBACKS) {
      try {
        console.log(`Attempting analysis with model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig 
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text(); // This throws if blocked by safety
        
        // If we get here, it worked! Clean and return.
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanText);
        
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
    throw lastError || new Error("All model attempts failed. Please check your API Key region.");

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