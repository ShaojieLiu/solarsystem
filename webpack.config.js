const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: '#eval-source-map',
  entry: {
    app: './index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img'
        }
      }
    }]
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    hot: true,
  },
  watchOptions: {
    poll: 1000,//监测修改的时间(ms)
    aggregateTimeout: 500,//防止重复按键，500毫秒内算按一次
    ignored: /node_modules/,//不监测
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Solar System',
      template: 'index.html'
    })
  ]
};
