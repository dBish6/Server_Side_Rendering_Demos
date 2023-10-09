import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  server: {
    middlewareMode: true,
  },
  resolve: {
    alias: {
      "@sharedViteConfig": path.resolve(__dirname, "./vite.config.ts"),
      "@front-end": path.resolve(__dirname, "./app/front-end/src"),
    },
  },
});
