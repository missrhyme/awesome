var path = require('path');
var webpack = require('webpack');
var walk = require('./utils/filesToList');

var list = walk('./scripts');

var entries = {};

list.forEach(function(item) {
  var nosuffix = item.replace('.js', '');
  var name = nosuffix.replace('./scripts/', '');
  entries[name] = nosuffix;
});

module.exports = {
  entry: entries,
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    }]
  },
  externals: {
    vue: 'Vue'
  }
};
