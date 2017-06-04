var path = require('path');
module.exports = {
  entry: {
    mediaq: './mediaq.ts',
    'test/test': './test/test.ts',
    'sample/app': './sample/app.ts'
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  }
}
