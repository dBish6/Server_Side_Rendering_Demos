import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import html from "@rollup/plugin-html";
import copy from "rollup-plugin-copy";
import autoExternal from "rollup-plugin-auto-external";

import getScopedName from "../getCssScope.mjs";

const isDev = process.env.NODE_ENV !== "production";

const __dirname = dirname(fileURLToPath(import.meta.url));

const extensions = [
  ".js", ".jsx", ".ts", ".tsx", ".ttf", ".eot", ".otf", ".woff", ".woff2", ".svg", ".png", ".css"
];

const reactCDNs = `
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin></script>
`;

export default {
  input: "./src/index.jsx",
  output: {
    dir: "../build/public",
    format: "umd",
    entryFileNames: "client.js",
    ...(isDev
      ? {}
      : {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react-router-dom": "ReactRouterDOM"
          }
        })
  },
  plugins: [
    nodeResolve({ 
      browser: true,
      extensions,
      dedupe: ["react", "react-dom"],
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      configFile: join(__dirname, "../babel.config.json")
    }),
    postcss({
      modules: { generateScopedName: getScopedName },
      extract: "main.css",
      inject: false
    }),
    html({
      fileName: "index.html",
      publicPath: join(__dirname, "public"),
      template: () => {
        const template = readFileSync(join(__dirname, "public/index.html"), "utf-8");
        return template
          .replace("<!--css-->", `<link rel="stylesheet" href="/static/main.css">`)
          .replace("<!--script-->", 
            isDev 
              ? `<script src="/static/client.js" defer></script>` 
              : `${reactCDNs}<script src="/static/client.js" defer></script>`
          );
      },
    }),
    copy({
      targets: [
        {
          src: "public/images/**/*",
          dest: "../build/public/images"
        }
      ],
      verbose: true
    }),
    autoExternal({ dependencies: true }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
      preventAssignment: true
    }),
    ...(isDev ? [] : [terser()])
  ],
  external: isDev ? [] : ["react", "react-dom"]
};
