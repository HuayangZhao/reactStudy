//因为webpack是基于node.js构建  所以node.js中的东西webpack都能一样用
// 后面要指定文件路径 所以要用到path模块
const path = require('path');
// 导入在内存中生成页面的插件
const HtmlWebPackPlugin = require('html-webpack-plugin')
// 创建一个插件实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template:path.join(__dirname,'./src/index.html'), //源文件
    filename:'index.html' //生成内存页面的名字
})
//这里能用 export default 导出配置吗？？？？？
// export default  {
//     entry: './src/index.js', //相对路径
//     output: {
//         path: path.resolve(__dirname, 'build'), //打包文件的输出路径
//         filename: 'bundle.js' //打包文件名
//     }
// }
//因为export default是es6语法 webpack并不支持 
module.exports = {
    mode:'development', //development 或者  production
    //在webpack4中 约定大于配置  默认会去src下面找到index.js作为入口打包文件 所以不必设置entry入口
    plugins:[//所有的插件
        htmlPlugin
    ],
    module:{ //所有的第三发模块配置规则
        rules:[
            {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}, //exclude为排除项  不能忘记加
            { test: /\.css$/, use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]']}  
        ]
    }
}