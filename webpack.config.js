var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/main',
  resolve: {
        extensions: ['', '.js', '.jsx']
  },
  output: { path: __dirname, filename: 'bundle.js' },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
    ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
};
