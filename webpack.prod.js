const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const Merge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals'); // eslint-disable-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const CompressionPlugin = require('compression-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

const svgIconsDirectory = path.join(__dirname, 'client/assets/svg/icons/');

const commonConfig = require('./webpack.common.js');

if (
  process.env.DEPLOYMENT_GROUP_NAME !== undefined
  && !process.env.DEPLOYMENT_GROUP_NAME.match(/^(prod|preprod|performance|staging|uat)/)
) {
  throw new Error(
    `Production build error: DEPLOYMENT_GROUP_NAME is unrecognised - '${process.env.DEPLOYMENT_GROUP_NAME}'`
  );
}

const appBaseDirectory = path.join(__dirname, 'app');

const serverConfig = {
  devtool: 'cheap-module-source-map',
  entry: './app/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'static/assets/style.css'
    }),
    new webpack.BannerPlugin({
      banner: '__isBrowser__ = false;',
      raw: true,
      include: /\.js$/
    }),
    new CopyWebpackPlugin([
      {
        from: `${appBaseDirectory}/client/assets/sitemap.xml`,
        to: `${appBaseDirectory}/sitemap.xml`
      },
      {
        from: `${appBaseDirectory}/client/assets/robots.txt`,
        to: `${appBaseDirectory}/robots.txt`
      }
    ])
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
                includePaths: [appBaseDirectory]
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
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-__-[hash:base64:5]'
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [appBaseDirectory]
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
        test: /\.ejs$/,
        use: [
          'raw-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: appBaseDirectory,
        use: [
          'file-loader?&name=./static/assets/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: appBaseDirectory,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './static/assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = [Merge(commonConfig, {
  plugins: [
    new webpack.EnvironmentPlugin({
      DEPLOYMENT_GROUP_NAME: process.env.DEPLOYMENT_GROUP_NAME
    }),
    new UglifyJsPlugin({
      parallel: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0
    })
  ]
}), serverConfig];
