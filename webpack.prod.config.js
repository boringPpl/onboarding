var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var SRC_PATH = path.join(__dirname, '/public/javascripts/app.js')
var DIST_PATH = path.join(__dirname, '/dist')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: SRC_PATH
  },
  output: {
    path: DIST_PATH,
    filename: '[name].bundle.js'
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
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'views', 'public']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]!sass') },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file?name=[name].[ext]' }
    ]
  }
}
