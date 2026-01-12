import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
// Ensure you have added GEMINI_API_KEY to your Vercel Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Configuration for consistent JSON output
const generationConfig = {
  temperature: 0.2,
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON body
    const body = await req.json();
    const { fileContent, statementType, fileName } = body;
    
    // Check for API Key in environment
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Server API Key missing. Please set GEMINI_API_KEY in Vercel Environment Variables.' }, 
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig 
    });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Sanitize JSON output (stripping Markdown if Gemini includes it)
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    return NextResponse.json(JSON.parse(text));

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}