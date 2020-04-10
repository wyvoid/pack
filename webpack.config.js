const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  // mode: production / development 两种模式
  mode: 'development',
  // 输出 source-map 以方便调试 ES6 源码
  devtool: 'source-map',
  // 开启监听模式
  devServer: {
    // webpack-dev-server 默认已经开启热更新模式，如果配置 hot: true 的话会导致热更新失效
    // 所以这里不用多余的开启热更新
    // hot: false,
    port: 8888,
    open: true,
    contentBase: resolve('dist'),
    proxy: {
      '/api/':{
        // target:'http://adyunwm.com/api/', //正式
        target:'http://preh5.psgxs.com/api',//预发
        // target:'http://192.168.40.215:8080/api',     //测试215
        // target:'http://192.168.40.246:8080/api',   //测试246
        changeOrigin:true,
        pathRewrite:{
          '/api/': '/'
        }
      },
      '/ps/': {
        target:'http://live.ipanshi.com',//预发
        ws: true, // proxy websockets
        changeOrigin:true,
      }
    },
    publicPath: resolve('/'),
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: 'index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
  },
  // 默认为执行启动webpack 时所在的当前工作目录，可以配置改变设置它
  // context 必须是一个绝对的字符串。
  context: resolve('./'),
  entry: {
    main: './src/main.js',
    index: './src/index.js',
  },
  output: {
    // 将所有依赖模块合并，并输出到bundle.js文件
    // filename: '[name].[hash:5].js',
    filename: '[name].js',
    // 将输出的问题放到dist目录下
    path: resolve('./dist'),
    // publicPath: 'https://gxs-bucket.oss-cn-shanghai.aliyuncs.com/social-h5/test/build/'
  },
  resolve:{
    // 通过别名来将原导入路径映射成一个新的导入路径。
    alias: {
      '@':  resolve('./src'),
      'components':  resolve('./src/components'),
      'assets': resolve('./src/assets'),
      // 解决 main.js  和 router 中引入 vue 文件不一致问题
      'vue': 'vue/dist/vue.js',
    },
    // 用户配置尝试过程中用到的后缀列表，从左往右尝试访问文件是否存在，找不到就报错
    extensions: ['.ts', '.js', '.json', '.vue'],
    // 寻找第三方模块, 默认只会去node_modules目录下寻找
    // import './src/components/button'  -->   可以用  import 'button' 导入
    modules: ['./src/components', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        }),        
      },
      {
        test: /\.(gif|png|jpe?g|eot|ttf|svg|pdf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.ts$/,
        // use: ['awesome-typescript-loader']
        loader: 'ts-loader',
        exclude: resolve('node_modules'),
        options: {
          // 让tsc 将 vue 文件当成一个TypeScript 模块去处理， 以解决 module not found 的问题， tsc 本身不会处理 .vue 结尾的文件。
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: resolve('src'),
        exclude: resolve('node_modules'),
      },
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
      // filename: `style.[name]_[md5:contenthash:hex:8].css`,
      filename: `style.[name].css`,
      // filename: `style.css`,
    }),
    new HtmlWebpackPlugin({
      // filename: 'index.[contenthash:8].html', // 生成的html存放路径，相对于publicPath
      filename: 'index.html', // 生成的html存放路径，相对于publicPath
      template: 'index.html', // html模板路径,      
      inject: true,
    }),
    new VueLoaderPlugin(),
    // 在每次生成dist目录前，先删除本地的dist文件
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['**/*', '!index*.html'],
    })
  ]
}


module.exports = webpackConfig