import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Run tests in Node.js environment (not jsdom)
        environment: 'node',

        // Load test env vars before every test file
        setupFiles: ['./backend/tests/setup.js'],

        // Only scan for tests inside backend/tests/
        include: ['backend/tests/**/*.test.js'],

        // Suppress noisy console output from app code during tests
        // (set to false while debugging a specific test if needed)
        silent: false,

        // Always use fake timers for isolation — override per-test if needed
        // fakeTimers: { enabled: false },

        // Clear mock state between every test automatically
        clearMocks: true,
        restoreMocks: true,
    },
});
