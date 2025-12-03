/**
 * Application Configuration
 * 
 * Central configuration file for the application.
 * Modify these values based on your environment.
 * 
 * ENVIRONMENT VARIABLES:
 * When deploying, consider using environment variables:
 * - VITE_API_BASE_URL
 * - VITE_GOOGLE_GEMINI_API_KEY
 * - VITE_ENABLE_MOCK_DATA
 */

export const config = {
  /**
   * API Configuration
   * Set this to your backend API URL when ready
   */
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000, // 10 seconds
    
    // Enable mock data (set to false when backend is ready)
    useMockData: import.meta.env.VITE_ENABLE_MOCK_DATA !== 'false',
  },

  /**
   * Feature Flags
   * Toggle features on/off easily
   */
  features: {
    enableChat: true,
    enableAdminPanel: true,
    enableMultiLanguage: true,
    enableBooking: true,
    enableCart: true,
  },

  /**
   * Google Gemini API Configuration
   * For the chatbot feature
   */
  gemini: {
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY || '',
    model: 'gemini-1.5-flash',
  },

  /**
   * Application Metadata
   */
  app: {
    name: 'Lumière Beauty & Wedding',
    version: '1.0.0',
    defaultLanguage: 'English',
  },

  /**
   * Payment Configuration
   * Add your payment gateway details here
   */
  payment: {
    // Stripe, PayPal, etc.
    provider: 'mock',
    publicKey: import.meta.env.VITE_PAYMENT_PUBLIC_KEY || '',
  },

  /**
   * Asset Configuration
   */
  assets: {
    imageUploadMaxSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
};

/**
 * Helper to check if we're in development mode
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Helper to check if we're in production mode
 */
export const isProduction = import.meta.env.PROD;

export default config;
