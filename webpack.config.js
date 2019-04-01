const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
      { 
        test: /\.png$/,
        use: 'file-loader'
      }
    ],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js',
  }
};