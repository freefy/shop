var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});//将jquery配置到全局当中,在下面的plugins进行引用,这样在整个文件当中都能使用jquery
module.exports = {
    entry: {
        index: './src/js/index.js',
        goodsInfo: './src/js/goodsInfo.js',
    },
    output: {
        filename: '[name].js',//输出文件名称
        path: __dirname + '/out',//打包后文件的地址
        publicPath: 'http://localhost:8080/out'//静态资源打包的路径,如图片导到服务器(唯一地址)
    },
    // 浏览器不识别ES6.less语法等,通过loader来对他们进行解析,会把浏览器不识别的语言解析成浏览器识别的语言,
    //loader加载器
    module: {
        //loaders:是webpack2版本的写法,rules是wepack3版本换成了rules
        // rules定义的是 比如.js结尾的问价文件需要哪些加载器对其进行解析
        rules: [
            // 每个问价都是一个模块,js文件,css文件,图片,less文件都各是一个模块
            {test: /.js$/, use: ['babel-loader']},//babel-loader内部需要加载依赖babel和babel-core
            // // {test: /.css$/, use: ['style-loader','css-loader']},//css文件会被被打包到js文件当中,会把css文件放到style标签内,先用css-loader解析样式,解析完用style-loader,放到style标签中
            // {
            //     test: /.css$/,
            //     use: ExtractTextPlugin.extract({
            //       fallback: "style-loader",
            //       use: "css-loader"
            //     })
            // }, //独立打包css                                             
             //图片大于8k就给它配置名字,否则就是base64编码格式命名
            {test: /.jpg|png|gif|svg$/, use: ['url-loader?limit=8192&name=./[name].[ext]']}, 
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']}//先通过less-loader解析成css,在用
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.optimize.CommonsChunkPlugin({//webpack4当中插件CommonsChunkPlugin不好使了,换成了其他两个插件
            name: "commons",
            filename: "commons.js",//一旦独立打包这个,必须在页面中引用
            minChunks:2
        }),  
            // 独立打包为common.js
        new ExtractTextPlugin("[name].css"), //独立打包css文件用的,起名称
        providePlugin  //整个文件都能使用jquery   
    ]
}
//配置文件可以重复使用,(根据要求更改一部分就可以使用)