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
    // path: path.resolve(__dirname, './dist'),
    publicPath: 'https://gxs-bucket.oss-cn-shanghai.aliyuncs.com/social-h5/test/build/'
  },
  resolve:{
    // 通过别名来将原导入路径映射成一个新的导入路径。
    alias: {
      components: './src/components/'
    },
    // 用户配置尝试过程中用到的后缀列表，从左往右尝试访问文件是否存在，找不到就报错
    extensions: ['.js', '.json', '.vue', '.ts'],
    // 寻找第三方模块, 默认只会去node_modules目录下寻找
    // import './src/components/button'  -->   可以用  import 'button' 导入
    modules: ['./src/components', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
      },
      {
        test: /\.(gif|png|jpe?g|eot|ttf|svg|pdf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),        
      }
    ],
  },
  // 用于扩展 webpack 的功能， 各种各样的 plugin 几乎可以让Webpack 做任何与构建相关的事情
  // 数组里的每一项都是一个要使用的plugin的实例，plugin需要的参数通过构造函数传入。
  plugins: [
    
    // 使用 npm i extract-text-webpack-plugin 会报错，因为没有对应的webpack4版本支持
    // 改用 npm i extract-text-webpack-plugin@next --save-dev
    new ExtractTextPlugin({
      // webpack4.3包含了contenthash 这个关键字段，所以在ExtractTextPlugin 中不能使用 contenthash
      // 使用 md5:contenthash:hex:8 替代
      // filename: `[name]_[contenthash:8].css`,
      filename: `style.[name]_[md5:contenthash:hex:8].css`,
      // filename: `style.css`,
    }),

    // 所有页面都会用到的公共代码被提取到 common 代码块中
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b'],
    })
  ]
}