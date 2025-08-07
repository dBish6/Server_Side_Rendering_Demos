const path = require("path");

const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";

const resolve = {
  extensions: [
    ".js", ".jsx", ".ts", ".tsx", ".ttf", ".eot", ".otf", ".woff", ".woff2", ".svg", ".png", ".css"
  ],
  fullySpecified: false
};

module.exports = {
  target: "web",
  mode: isDev ? "development" : "production",
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "../build/public"),
    /**
     * Appends /public to index.html when looking for client.js
     * This is where Express is serving static files from.
     */
    publicPath: "/public",
    filename: "client.js"
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
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                localIdentName: "[sha1:hash:hex:4]",
                localIdentContext: path.join(__dirname, "..")
              },
              importLoaders: 1,
              ...(isDev && { sourceMap: true })
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html")
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/images"),
          to: path.resolve(__dirname, "../build/public/images")
        }
      ]
    })
  ],
  resolve
}
