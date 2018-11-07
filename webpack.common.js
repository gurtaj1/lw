const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

const CleanWebpackPlugin = require('clean-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const StyleLintPlugin = require('stylelint-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const appBaseDirectory = path.join(__dirname, 'app');
const staticAssetsDirectory = path.join(__dirname, 'static/assets');
const svgIconsDirectory = path.join(__dirname, 'client/assets/svg/icons/');

const commonConfig = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: ['babel-polyfill', './app/index.jsx']
  },
  output: {
    path: staticAssetsDirectory,
    publicPath: '/assets/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV
    }),
    new CleanWebpackPlugin(['static']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      title: 'Client Template',
      template: './app/index.html',
      filename: '../index.html',
      favicon: './app/assets/favicons/favicon.png'
    }),
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new StyleLintPlugin({
      files: ['**/**/*.scss'],
      syntax: 'scss'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(appBaseDirectory),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: appBaseDirectory,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.global\.scss$/,
        exclude: /node_modules/,
        include: appBaseDirectory,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [appBaseDirectory],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /\.global\.scss$/],
        include: appBaseDirectory,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[local]-__-[hash:base64:5]',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [appBaseDirectory],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.svg$/,
        include: svgIconsDirectory,
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: svgIconsDirectory,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: appBaseDirectory,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: appBaseDirectory,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};

module.exports = commonConfig;
