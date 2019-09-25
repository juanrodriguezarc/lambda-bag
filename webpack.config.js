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
    filename: "lambda.bag.dist.js",
  },
}

