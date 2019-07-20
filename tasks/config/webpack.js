import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import OfflinePlugin from 'offline-plugin'

import { join, resolve } from 'path'
import { paths } from './paths'
import {
  env,
  pkg,
  isProduction,
  siteConfig
} from './base'
import {
  serviceWorker,
  sassConfig,
  faviconsConfig
} from './plugins'

// let libraryName = 'TrackUI'
let outputFile = '[name].bundle.js'
let plugins = []

plugins.push(new webpack.DefinePlugin({
  VERSION: JSON.stringify(pkg.version)
}))

plugins.push(new webpack.BannerPlugin({
  banner: `${pkg.name} - ${pkg.description}
@link ${pkg.homepage}
@version ${pkg.version}
@license ${pkg.license}
@author ${pkg.author.name} <${pkg.author.email}> | ${pkg.author.site}`
}))

plugins.push(new CleanWebpackPlugin())

plugins.push(new HtmlWebpackPlugin({
  template: resolve(paths.src, 'index.pug'),
  hash: true,
  cache: true,
  templateParameters: {
    globals: { ...siteConfig, ...{ favicons: faviconsConfig } }
  }
}))

plugins.push(new MiniCssExtractPlugin({
  filename: 'styles/style.[contenthash].css'
}))

plugins.push(new OfflinePlugin(serviceWorker))

export const webpackConfig = {
  mode: env,
  devtool: isProduction ? 'source-map' : '',
  entry: join(paths.src, 'index.js'),
  output: {
    publicPath: '/',
    path: paths.dist,
    filename: outputFile
  },
  context: paths.dist,
  module: {
    rules: [{
      test: /\.pug/,
      loader: 'pug-loader',
      query: {
        pretty: !isProduction
      }
    }, {
      test: /\.scss/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: sassConfig
        }
      ]
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
      use: {
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name]-[hash].[ext]'
        }
      }
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      }
    }]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      paths.modules,
      paths.scripts
    ]
  },
  plugins
}
