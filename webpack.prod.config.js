var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.join(__dirname, '/containers'),
  entry: {
    login: './Login.js',
    dashboard: './admin/Dashboard.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', '/']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]') }
    ]
  }
}
