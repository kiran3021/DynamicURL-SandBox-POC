/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({

  plugins: [
    // reactRouter({
    //   ignoredRouteFiles: ["**/*.css",],
    // }),
    reactRouter(),
    tsconfigPaths(),
    // react(),
  ],
 
});
