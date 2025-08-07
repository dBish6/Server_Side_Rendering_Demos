import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    port: 3000
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName:
        mode === "production"
          ? "[hash:base64:8]"
          : "[local]_[hash:base64:5]"
    }
  },
  plugins: [react()],
  ssr: {
    noExternal: ["react-router-dom"]
  },
  build: {
    outDir: isSsrBuild ? "build" : "build/public",
    copyPublicDir: !isSsrBuild,
    ...(isSsrBuild && { emptyOutDir: false }),
    rollupOptions: {
      ...(isSsrBuild && {
        output: {
          format: "es",
          entryFileNames: "server.mjs"
        }
      })
    }
  }
}));
