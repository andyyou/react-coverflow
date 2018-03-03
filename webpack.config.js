'use strict';
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

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
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader'
        ],
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
