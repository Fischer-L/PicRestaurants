const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
   index: "./client/index.js",
  },
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },

  mode: "development",

  watch: true,

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html"
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["transform-react-jsx", "transform-runtime", "babel-plugin-transform-regenerator"],
            presets: ['babel-preset-env'],
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" 
          }, {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};