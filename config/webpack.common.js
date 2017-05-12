var webpack = require('webpack');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app': ['./src/main.js'],
    'bootstrap': ['./assets/stylesheets/bootstrap.scss'],
    'vendor': ['./assets/stylesheets/vendor.scss'],
    'base': ['./assets/stylesheets/base.scss']
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(['raw-loader', 'sass-loader'])
      }
    ]
  },
};
