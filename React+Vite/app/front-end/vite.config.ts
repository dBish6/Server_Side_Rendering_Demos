import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    middlewareMode: true,
  },
  ssr: {},
  plugins: [tsconfigPaths()],
  build: {
    outDir: "build/client",
    ssr: "src/entry-server.tsx",
  }
});
