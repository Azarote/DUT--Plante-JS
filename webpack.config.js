const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  watch: true,
  
 module: {
  rules: [
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
    new HtmlWebpackPlugin({
      title: 'PlantSearcher'
    })
  ]
}

module.exports = (env, argv) => {
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
            publicPath: '../../'
          }
        },
        { loader: 'css-loader' },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })
    config.plugins.push(new OptimizeCSSAssets())
  }

  return config
}