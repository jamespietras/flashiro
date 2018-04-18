import chalk from 'chalk';
import dotenv from 'dotenv';
import path from 'path';
import PluginClean from 'clean-webpack-plugin';
import PluginExtractText from 'extract-text-webpack-plugin';
import PluginHtml from 'html-webpack-plugin';
import PluginProgressBar from 'progress-bar-webpack-plugin';
import webpack from 'webpack';

dotenv.config();

const config = {
  mode: 'production',
  target: 'web',
  entry: './src/index.tsx',
  stats: {
    builtAt: true,
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    env: true,
    modules: false,
  },
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
        loader: PluginExtractText.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true },
            },
            {
              loader: 'sass-loader',
              options: { includePaths: ['src'] },
            },
          ],
        }),
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif|ico)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new PluginClean('build', { verbose: false }),
    new PluginExtractText('styles.css'),
    new PluginHtml({
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'public/index.html'),
      // favicon: path.join(__dirname, 'public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
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
};

export default config;
