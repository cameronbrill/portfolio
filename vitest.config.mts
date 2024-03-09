import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals:true,
    setupFiles: "src/setupTests.ts",
    reporters: ['default', 'html', 'json'],
    coverage: {
      provider: 'istanbul',
      all: true,
      reporter: ["json", "text", "html", "json-summary"],
      reportsDirectory: './src/__tests__/coverage',
      reportOnFailure: true,
    }
  },
})