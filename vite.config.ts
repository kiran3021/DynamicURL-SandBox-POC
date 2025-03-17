/// <reference types="vitest/config" />
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css",],
    }),
    tsconfigPaths(),
  ],
  test: {
    // includeSource: ["src/*/*.{js,tsx,ts,{test,spec}.?(c|m)[jt]s?(x)}",],
    coverage: {
      reporter: ['text', "html"]
    }

  }
});
