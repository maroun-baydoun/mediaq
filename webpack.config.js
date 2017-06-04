var path = require('path');
module.exports = {
  entry: {
    'test/test': './test/test.ts',
    'sample/app': './sample/app.ts'
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/web/',
    path: path.resolve(__dirname, 'dist/web')
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
