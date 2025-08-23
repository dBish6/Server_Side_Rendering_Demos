const path = require("path");

const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");

const isDev = process.env.NODE_ENV !== "production";

const resolve = {
  extensions: [
    ".js", ".jsx", ".ts", ".tsx", ".ttf", ".eot", ".otf", ".woff", ".woff2", ".svg", ".png", ".css"
  ],
  fullySpecified: false
};

module.exports = {
  target: "node",
  mode: isDev ? "development" : "production",
  entry: "./src/v1/index.js",
  output: {
    path: path.join(__dirname, "../build"),
    filename: "server.cjs",
    libraryTarget: "commonjs2",
    chunkFormat: "commonjs",
  },
  externalsPresets: { node: true },
  externals: [nodeExternals({
    modulesDir: path.join(__dirname, "../node_modules")
  })],
  optimization: {
    splitChunks: false,
    runtimeChunk: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { rootMode: "upward" },
        },
        resolve
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                exportOnlyLocals: true,
                localIdentName: "_[sha1:hash:hex:4]",
                localIdentContext: path.join(__dirname, "..")
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: "ignore-loader"
      }
    ]
  },
  plugins: [
    new Dotenv({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) })
  ],
  resolve
}
