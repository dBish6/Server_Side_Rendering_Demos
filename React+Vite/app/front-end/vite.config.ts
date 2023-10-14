import { mergeConfig, defineConfig } from "vite";
import sharedConfig from "../../vite.config";

export default mergeConfig(
  sharedConfig,
  defineConfig({
    // server: {
    //   host: "localhost",
    //   port: 3000,
    // },
    // plugins: [react()],
    build: {
      outDir: "build",
    },
  })
);
