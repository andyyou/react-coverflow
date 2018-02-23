'use strict';
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
 new webpack.LoaderOptionsPlugin({
    debug: true,
    test: /\.js$/,
    options: {
      eslint: {
        configFile: path.resolve(__dirname, '.eslintrc'),
        cache: false,
      }
    },
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
];

const entry = {};
const mainEntryPoints = glob.sync(
  path.join(__dirname, './src/*.js')
);

entry['react-coverflow'] = mainEntryPoints;

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-converflow',
  },
  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      }
    }
  ],
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: false,
              },
            },
          ],
          publicPath: '../'
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
  },
  plugins: plugins,
};
