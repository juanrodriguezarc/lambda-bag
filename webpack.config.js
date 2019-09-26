/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
}

