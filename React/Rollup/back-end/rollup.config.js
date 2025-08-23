import { fileURLToPath } from "url";
import { dirname, join } from "path";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import autoExternal from "rollup-plugin-auto-external";

import getScopedName from "../getCssScope.mjs";

const isDev = process.env.NODE_ENV !== "production";

const extensions = [
  ".js", ".jsx", ".ts", ".tsx", ".ttf", ".eot", ".otf", ".woff", ".woff2", ".svg", ".png", ".css"
];

export default {
  input: "./src/v1/index.js",
  output: {
    dir: "../build",
    format: "cjs",
    exports: "auto",
    entryFileNames: "server.cjs",
  },
  plugins: [
    nodeResolve({
      browser: false,
      extensions
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      configFile: join(fileURLToPath(dirname(import.meta.url)), "../babel.config.json")
    }),
    postcss({
      modules: {
        exportOnlyLocals: true,
        generateScopedName: getScopedName
      },
      inject: false,
      extract: false // Doesn't emit CSS.
    }),
    autoExternal({ dependencies: true }),
    ...(isDev ? [] : [terser()])
  ],
  external: ["react", "react-dom", "react-router-dom"]
};
