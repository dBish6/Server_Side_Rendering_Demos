import { defineConfig, mergeConfig } from "vite";
import { defaults } from "../vite.config";

export default defineConfig(({ mode }) => {
  return mergeConfig(
    defaults,
    defineConfig({
      server: { port: 3000 },
      css: {
        modules: {
          localsConvention: "camelCaseOnly",
          generateScopedName:
            mode === "production"
              ? "[hash:base64:8]"
              : "[local]_[hash:base64:5]"
        }
      },
      build: { outDir: "../build/public" }
    })
  );
});
