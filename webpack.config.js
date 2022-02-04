const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  // this is the default entry
  // entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
}