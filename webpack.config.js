const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const production = process.env.NODE_ENV === "production";
const options = {};

options.webpackMode = production ? "production" : "development";

options.HtmlWebpackPlugin = {
  template: "./client/index.html",
};
if (production) {
  options.HtmlWebpackPlugin.minify = {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true,
  };
} 

module.exports = {
  entry: {
   index: "./client/index.js",
  },
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },

  devtool: 'source-map',

  mode: options.webpackMode,

  plugins: [
    new HtmlWebpackPlugin(options.HtmlWebpackPlugin)
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["transform-react-jsx", "transform-class-properties", "transform-runtime", "babel-plugin-transform-regenerator"],
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