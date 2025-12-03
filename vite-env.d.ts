/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ENABLE_MOCK_DATA?: string;
  readonly VITE_GOOGLE_GEMINI_API_KEY?: string;
  readonly VITE_PAYMENT_PUBLIC_KEY?: string;
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
