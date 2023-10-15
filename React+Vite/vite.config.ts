import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  //   ssr: {

  //   },

  // build: {
  //   target: "node", // Set the build target to Node.js
  //   outDir: "build", // Output directory for the built files
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, "./app/front-end/src/index.html"), // Adjust the path to your entry point
  //     },
  //     // Externalize dependencies for SSR
  //     external: ["react", "react-dom", "react-router-dom"],
  //   },
  // },
  // optimizeDeps: {
  //   // Explicitly specify the dependencies needed for SSR
  //   include: ["react", "react-dom", "react-router-dom"],
  // },
  resolve: {
    alias: {
      "@front-end": path.resolve(__dirname, "./app/front-end/src"),
    },
  },
});
