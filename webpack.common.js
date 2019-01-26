const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const entry = {};
const mainEntryPoints = glob.sync(path.join(__dirname, './src/*.js'));

entry['react-coverflow'] = mainEntryPoints;

module.exports = {
  entry,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      test: /\.js$/,
      options: {
        eslint: {
          configFile: path.resolve(__dirname, '.eslintrc'),
          cache: false,
        },
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'react-converflow',
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
          ecma: 6,
          mangle: true,
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
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
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          {
            loader: 'sass-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
