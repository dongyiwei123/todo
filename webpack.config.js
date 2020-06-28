const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 指定生成的css文件名和路径
      filename: './css/index.css',
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
        test: /\.css$/,
        loader: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 去上一层目录加载静态资源
            publicPath: '../'
          }
        }, 'css-loader']
      }, {
        test: /\.less$/,
        loader: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 去上一层目录加载静态资源
            publicPath: '../'
          }
        }, 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[hash:8].[ext]',
            outputPath: 'images/',
          },
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[hash:8].[ext]',
            outputPath: 'images/',
          },
        }]
      }, {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  // devServer的配置
  devServer: {
    // 自定义端口
    port: 9090,
    // 自动打开浏览器
    open: true
  }
}