const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.MODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
  new CleanWebpackPlugin(),
  new ESLintWebpackPlugin({ extensions: 'ts' }),
];

module.exports = {
  mode,
  plugins,
  target,
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.(s[ac]|c)ss$/i, 
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf|)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
};

