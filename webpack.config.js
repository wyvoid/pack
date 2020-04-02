const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // 默认为执行启动webpack 时所在的当前工作目录，可以配置改变设置它
  // context 必须是一个绝对的字符串。
  context: path.resolve(__dirname, '.'),
  entry: {
    main: './main.js',
    index: './index.js'
  },
  output: {
    // 将所有依赖模块合并，并输出到bundle.js文件
    filename: '[name].[hash:5].js',
    // 将输出的问题放到dist目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      } 
    ]
  },
  plugins: [
    
    // 使用 npm i extract-text-webpack-plugin 会报错，因为没有对应的webpack4版本支持
    // 改用 npm i extract-text-webpack-plugin@next --save-dev
    new ExtractTextPlugin({
      // webpack4.3包含了contenthash 这个关键字段，所以在ExtractTextPlugin 中不能使用 contenthash
      // 使用 md5:contenthash:hex:8 替代
      // filename: `[name]_[contenthash:8].css`,
      filename: `style.[name]_[md5:contenthash:hex:8].css`,
      // filename: `style.css`,
    })
  ]
}