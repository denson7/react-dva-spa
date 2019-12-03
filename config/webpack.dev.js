const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "../dist"),
    progress: true,
    compress: true,
    port: 5000,
    proxy: {
      "/api": {
        target: "https://cnodejs.org",
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    // stats: "errors-only"
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
}));
