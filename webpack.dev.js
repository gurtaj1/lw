const Merge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const CommonConfig = require('./webpack.common.js');

const WriteFilePlugin = require('write-file-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = Merge(CommonConfig, {
  plugins: [
    new WriteFilePlugin()
  ],
  devServer: {
    contentBase: 'static',
    // port: 8104,
    port: 80,
    host: '127.0.0.1',
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: false
  }
});
