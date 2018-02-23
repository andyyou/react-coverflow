const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const precss = require('precss');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const jsloader = (process.env.NODE_ENV === 'react-hot') ? 'react-hot-loader!babel-loader':'babel-loader';

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
  }),
  // new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
];

var entry = {};
var mainEntryPoints = glob.sync(
  // Ignore compile filename with `.bundle.js`
  path.join(__dirname, './js/!(*.bundle).js')
);
entry['main'] = mainEntryPoints;

var config = {
  context: __dirname,
  entry: entry,
  output: {
    path: __dirname + '/js',
    filename: '[name].bundle.js',
    publicPath: 'js/',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css']
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
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loader: 'css-loader'
      //   // use: ExtractTextPlugin.extract({
      //   //   fallback: 'style-loader',
      //   //   use: [
      //   //     'css-loader',
      //   //     {
      //   //       loader: 'sass-loader',
      //   //       query: {
      //   //         sourceMap: false,
      //   //       },
      //   //     },
      //   //   ],
      //   //   publicPath: '../'
      //   // }),
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsloader,
      },
    ],
  },
  plugins: plugins,
};

module.exports = config;
