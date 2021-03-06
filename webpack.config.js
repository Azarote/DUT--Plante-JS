const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
require("babel-core/register");
require("babel-polyfill");

var config = {
  context: path.resolve(__dirname, 'src'),		
  entry: {
	  app: './index.js',
	  styles: './css/styles.css'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
	library: 'myApp',
    libraryTarget: 'umd'
  },
  
 module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { 'targets': { 'browsers': '> .5% or last 3 versions' } }]
          ]
        }
      }]
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:7].[ext]',
          outputPath: 'assets/images/'
        }
      }]
    }
  ]
},
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/[name].css', chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'PlantSearcher'
    })
  ]
}

module.exports = (env, argv) => {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ]
  
  if (argv.mode === 'development') {
    config.devtool = 'eval'

    config.devServer = {
      contentBase: path.resolve(__dirname, './public'),
      host: 'localhost', 
      port: 3000,
      publicPath: 'http://localhost:3000/',
      historyApiFallback: true,
      inline: true,
      open: true,
      hot: true,
      overlay: true
    }
  }

  if (argv.mode === 'production') {
    config.devtool = 'source-map'

    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        { loader: 'css-loader' }
      ]
    })
    config.plugins.push(new OptimizeCSSAssets())
  }

  return config
}