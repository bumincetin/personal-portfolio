# Gemini API Setup Guide

## Important Note

The file `client_secret_*.json` contains **OAuth credentials** for Google Cloud services. However, **Gemini API requires a direct API key** from Google AI Studio, not OAuth credentials.

## Setup Options

### Option 1: Environment Variable (Recommended)

1. Get your Gemini API key from: https://aistudio.google.com/apikey
2. Create a `.env.local` file in the project root:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. The API will automatically use this key

### Option 2: Add API Key to Credentials File

1. Get your Gemini API key from: https://aistudio.google.com/apikey
2. Edit the `client_secret_*.json` file and add an `api_key` field:
   ```json
   {
     "api_key": "your_gemini_api_key_here",
     "web": {
       "client_id": "...",
       "project_id": "...",
       ...
     }
   }
   ```

## Security

- Never commit API keys to Git
- The credentials file is already in `.gitignore`
- Use environment variables for production deployments

## Testing

After setup, the portal at `/{locale}/portal` will use Gemini API to analyze financial statements.
