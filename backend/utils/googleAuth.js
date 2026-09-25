import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

/**
 * Returns an authenticated Google API client.
 * Supports two auth methods:
 *   1. GOOGLE_CREDENTIALS_JSON  — service account JSON as an env string (Render)
 *   2. GOOGLE_APPLICATION_CREDENTIALS — path to a local JSON file (dev)
 */
export const getAuthClient = async () => {
    const jsonStr = process.env.GOOGLE_CREDENTIALS_JSON;
    const filePtr = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    try {
        if (jsonStr) {
            const credentials = JSON.parse(jsonStr);
            const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
            return await auth.getClient();
        }

        if (filePtr) {
            const auth = new google.auth.GoogleAuth({ keyFile: path.resolve(filePtr), scopes: SCOPES });
            return await auth.getClient();
        }

        throw new Error('No Google Credentials available. Set GOOGLE_CREDENTIALS_JSON or GOOGLE_APPLICATION_CREDENTIALS.');
    } catch (error) {
        console.error('❌ Google Auth error:', error.message);
        throw error;
    }
};
