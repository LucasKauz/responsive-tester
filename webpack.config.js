const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'img/[name].[md5:hash:hex:6].[ext]'
            }
          }
        ]
      },
      {
        test: /\.scss/i,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'production',
              publicPath: '../'
            },
          },
          {
            loader:'css-loader',
            options: {
              importLoaders: 3
            }
          },
          'clean-css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      // favicon: path.resolve(__dirname, 'src/img/favicon.png'),
      minify: {
        removeScriptTypeAttributes: true
      }
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i  }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}
