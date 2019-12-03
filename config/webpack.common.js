const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const webpack=require('webpack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const resolve = (pathName) => path.resolve(__dirname, '../' + pathName);

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    // dev
    filename: 'js/[name].[hash].js',
    // pro
    // filename: 'js/[name].[chunkhash].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [resolve('src')],
        loader: 'eslint-loader'
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|jsx)$/,
        // 把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
        loader: 'happypack/loader?id=happyBabel',
        // 排除node_modules 目录下的文件
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        // 处理顺序由后向前
        // less-loader --> css-loader --> style-loader
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: '1024',
            name: 'resource/[name].[ext]'
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@assets': resolve('assets'),
      '@utils': resolve('src/utils'),
      '@pages': resolve('src/pages'),
      '@config': resolve('src/config'),
      '@services': resolve('src/services'),
      '@components': resolve('src/components')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../public/index.html'),
      // favicon: path.resolve('favicon.ico'),
      title: 'KiplePay',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true
      }
    }),
    // 多进程打包
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }],
      threadPool: happyThreadPool,
      verbose: true
    }),
    // 加快构建速度
    new HardSourceWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin()
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
          name: "common"
        },
        vendor: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](react|redux)/,
          priority: -2,
          name: 'vendor'
        },
        echarts: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          priority: 2,
          name: 'echarts'
        }
      }
    },
    runtimeChunk: true
  }
};
