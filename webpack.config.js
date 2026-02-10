const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  // Entry point of your React app
  entry: "./src/index.js",

  // Output bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true
  },

  // Development server
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true // important for React apps
  },

  // How different files are handled
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,          // 🔥 FIX #1: allow .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  },

  // 🔥 FIX #2: allow imports without extension
  resolve: {
    extensions: [".js", ".jsx"]
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
