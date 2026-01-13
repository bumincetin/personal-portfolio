import fs from 'fs';
import path from 'path';

interface GoogleCredentials {
  api_key?: string;
  web?: {
    client_id?: string;
    project_id?: string;
    client_secret?: string;
    auth_uri?: string;
    token_uri?: string;
    api_key?: string;
  };
}

/**
 * Get Gemini API Key from credentials file or environment variable
 * Note: Gemini API requires an API key from Google AI Studio (https://aistudio.google.com/apikey)
 * The OAuth credentials file can be used for other Google APIs, but Gemini needs a direct API key
 * 
 * Setup: Add "api_key" field to the credentials JSON file, or set GEMINI_API_KEY environment variable
 */
export function getGeminiApiKey(): string {
  // Priority 1: Environment variable (recommended for production)
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }

  // Priority 2: Try to read from credentials file (server-side only)
  if (typeof window === 'undefined') {
    try {
      const credentialsPath = path.join(
        process.cwd(),
        'client_secret_830976725848-3cqi3d9bls57rgk4mtp94apra3lnvifr.apps.googleusercontent.com.json'
      );
      
      if (fs.existsSync(credentialsPath)) {
        const fileContent = fs.readFileSync(credentialsPath, 'utf-8');
        const credentials: GoogleCredentials = JSON.parse(fileContent);
        
        // Check if there's an api_key field at root level
        if (credentials.api_key) {
          return credentials.api_key;
        }
        
        // Check if api_key is in web object
        if (credentials.web?.api_key) {
          return credentials.web.api_key;
        }
        
        // If no API key in file, log a helpful message
        console.warn('Credentials file found but no API key. Please either:\n1. Set GEMINI_API_KEY environment variable, or\n2. Add "api_key" field to the credentials JSON file.\nGet your API key from: https://aistudio.google.com/apikey');
      }
    } catch (error) {
      console.warn('Could not read credentials file:', error);
    }
  }

  // Next.js automatically loads .env.local, so if GEMINI_API_KEY is set there, it will be used
  
  return '';
}

/**
 * Get project ID from credentials file
 */
export function getProjectId(): string | undefined {
  try {
    const credentialsPath = path.join(
      process.cwd(),
      'client_secret_830976725848-3cqi3d9bls57rgk4mtp94apra3lnvifr.apps.googleusercontent.com.json'
    );
    
    if (fs.existsSync(credentialsPath)) {
      const fileContent = fs.readFileSync(credentialsPath, 'utf-8');
      const credentials: GoogleCredentials = JSON.parse(fileContent);
      return credentials.web?.project_id;
    }
  } catch (error) {
    console.warn('Could not read project ID from credentials file:', error);
  }
  
  return undefined;
}
