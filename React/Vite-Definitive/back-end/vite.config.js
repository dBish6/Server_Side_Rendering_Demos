import { defineConfig, mergeConfig } from "vite";
import { defaults } from "../vite.config";

export default defineConfig(() => {
  return mergeConfig(
    defaults,
    defineConfig({ 
      define: {},
      ssr: {
        noExternal: ["react-router-dom"]
      },
      build: {
        outDir: "../build",
        copyPublicDir: false,
        emptyOutDir: false,
        rollupOptions: {
          output: {
            format: "es",
            entryFileNames: "server.mjs" // Should be able to run everything including the api with ssr.
          }
        }
      }
    })
  );
});
