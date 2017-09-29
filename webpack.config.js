var path = require('path')
var webpack = require('webpack')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = {

  entry: {
    'mediaq': PATHS.src + '/mediaq.ts'
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    library: 'mediaq',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
