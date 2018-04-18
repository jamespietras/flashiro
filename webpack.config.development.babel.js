import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import { BundleAnalyzerPlugin as PluginAnalyzer } from 'webpack-bundle-analyzer';
import PluginHtml from 'html-webpack-plugin';
import PluginProgressBar from 'progress-bar-webpack-plugin';
import webpack from 'webpack';

dotenv.config();

const analyzerHost = process.env.ANALYZER_HOST || 'localhost';
const analyzerPort = process.env.ANALYZER_PORT || 8081;
const serverHost = process.env.DEV_HOST || 'localhost';
const serverPort = process.env.DEV_PORT || 8080;

/* eslint-disable no-console */
const analyzerInfo = `${analyzerHost}:${analyzerPort}`;
const serverInfo = `${serverHost}:${serverPort}`;
console.log(`App available on ${chalk.green.bold(serverInfo)}`);
console.log(`Analyzer available on ${chalk.green.bold(analyzerInfo)}\n`);
/* eslint-enable no-console */

const config = {
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '@flashiro': path.join(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use : [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
            },
          },
          'ts-loader',
        ],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { includePaths: ['src'], sourceMap: true },
          },
        ],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif|ico)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new PluginAnalyzer({
      analyzerHost,
      analyzerPort,
      logLevel: 'warn',
      openAnalyzer: false,
    }),
    new PluginHtml({
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'public/index.html'),
      // favicon: path.join(__dirname, 'public/favicon.ico'),
    }),
    new PluginProgressBar({
      clear: false,
      complete: chalk.green.bold('#'),
      format: 'Building... [:bar] :current/:total',
      incomplete: ' ',
      renderThrottle: 500,
      summary: false,
      width: 20,
    }),
  ],
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    historyApiFallback: true,
    host: serverHost,
    hot: true,
    noInfo: true,
    open: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    port: serverPort,
    publicPath: '/',
    stats: 'errors-only',
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};

export default config;
