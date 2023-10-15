import { mergeConfig, defineConfig } from "vite";
import sharedConfig from "../../vite.config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    server: {
      middlewareMode: true,
    },
    ssr: {},
    // plugins: [react()],
    build: {
      outDir: "build/client",
    },
  })
);
