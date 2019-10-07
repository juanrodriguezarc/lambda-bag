/* eslint-disable no-undef */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


module.exports = {
  entry: "./src/index.ts",
  mode: 'development',
  watch: false,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          /test/,
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'lambda-bag',
    umdNamedDefine: true
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
}

