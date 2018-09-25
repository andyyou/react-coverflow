const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// const precss = require("precss");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const jsloader = process.env.NODE_ENV === 'react-hot'
  ? ['react-hot-loader/babel', 'babel-loader?presets[]=react']
  : 'babel-loader?presets[]=react';
const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
  new UglifyJsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const entry = {};
const mainEntryPoints = glob.sync(
  // Ignore compile filename with `.bundle.js`
  path.join(__dirname, './js/!(*.bundle).js'),
);
entry.main = mainEntryPoints;

const config = {
  mode: 'development',
  context: __dirname,
  entry,
  output: {
    path: `${__dirname}/js`,
    filename: '[name].bundle.js',
    publicPath: 'js/',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    alias: {
      radium: require.resolve('radium/index'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: "babel-loader",
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsloader,
      },
    ],
  },
  plugins,
};

module.exports = config;
