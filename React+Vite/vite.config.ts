import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@front-end": path.resolve(__dirname, "./app/front-end/src"),
    },
  },
});
