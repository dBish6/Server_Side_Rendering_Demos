const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server.ts", // Entry point for your server TypeScript file
  target: "node", // Set the target environment to Node.js
  externals: [nodeExternals()],
  mode: "development",
  output: {
    filename: "server.js", // Output filename
    path: path.resolve(__dirname, "build"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /(node_modules|\.svg$)/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["null-loader"],
      },
      {
        test: /\.(svg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/",
            publicPath: "/assets/",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
