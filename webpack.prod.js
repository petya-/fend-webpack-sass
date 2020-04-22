const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //env
  mode: "production",
  // entry point for webpack as the default
  // does not suit us
  entry: "./src/client/index.js",
  output: {},
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        // chainable orders, one loader uses the output of another
        // NB: chained loaders run in order from right to left
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
  ],
};
