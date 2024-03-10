import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/setupTests.ts",
    reporters: ["default", "html", "json"],
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude || []),
        "html/**",
        "build/**/*",
        ".yarn/**/*",
        "next.config.js",
        "**/.{idea,git,cache,output,temp,yarn}/**",
      ],
      provider: "istanbul",
      reporter: ["json", "text", "html", "json-summary"],
      reportsDirectory: "./src/__tests__/coverage",
      reportOnFailure: true,
      thresholds: {
        lines: 70,
        branches: 80,
        functions: 90,
        statements: 70,
      },
    },
  },
});
