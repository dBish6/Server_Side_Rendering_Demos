import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export const defaults = defineConfig({
  envDir: process.cwd(),
  plugins: [react(), tsconfigPaths()]
});
