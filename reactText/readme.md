# react从0到1


## webpack基本配置
1.新建文件夹（reactText)  
2.运行npm init -y,快速初始化项目  
3.在根目录新建src源代码目录和dist打包好的产品目录    
4.在src中新建页面（index.html）和入口文件main.js  
5.使用`npm i webpack webpack-cli -Dan`  
6.根目录下新建webpack.config.js配置文件  
### webpack3.6和webpack4的区别
- webpack3中打包构建可以在package.json中配置dev用webpack命令行打包   

		"dev": "webpack-dev-server --open --port 3000 --hot"
- webpack4中package.json新增了mode打包配置  

		module.exports = {
			mode:'production',   //development 或者  production
		}

- webpack4中把webpack和打包构建分开了，webpack4构建项目需要使用webpack-cli包来提供  

## npm run dev
- 配置完成后运行`npm run dev`在浏览器中打开项目
- 把html放置到虚拟内存中用到`npm i html-webpack-plugin -D`
- 在webpack.config.js中配置  

		// 后面要指定文件路径 所以要用到path模块 
		const path = require('path');
		// 导入在内存中生成页面的插件
		const HtmlWebPackPlugin = require('html-webpack-plugin')
		// 创建一个插件实例对象
		const htmlPlugin = new HtmlWebPackPlugin({
		    template:path.join(__dirname,'./src/index.html'), //源文件
		    filename:'index.html' //生成内存页面的名字
		})
		module.exports = {
		    mode:'production', //development 或者  production
		//第三方加载器
		    plugins:[
		        htmlPlugin
		    ]
		}

## 在项目中使用react
1.运行`npm i react react-dom -S`安装包  

 - react:专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
 - react-dom：渲染页面，专门用于进行DOM操作的，主要应用场景是`ReactDOM.render()`  
 
2.在index.js中导入`react react-dom`包
 
		// 导入react react-dom包时 名称必须这样 不可变
		import React from 'react'
		import ReactDOM from 'react-dom'
		
3.创建虚拟DOM  

		//参数1：创建元素的类型，字符串，表示元素的名称
		//参数2：是一个对象或者null，表示当前这个DOM的元素属性
		//参数3：子节点（包括其他的虚拟DOM 获取文本子节点）
		//参数n:其他子节点
		//<h1 id='myh1'></h1>
		const myh1 = React.createElement('h1',{id:'myh1'},'我是H1')

4.使用ReactDOM把虚拟DOM渲染到页面上  

		
		//参数1：要渲染的虚拟DOM名
		//参数2：指定页面上的容器 不可用选择器 需要是DOM元素
		ReactDOM.render(myh1,document.getElementById('app'))
#### 用这种方式创建虚拟DOM太过于麻烦，所以要用到JSX，可以在js中直接书写html文本
## 使用JSX
1.配置安装babel插件  

 - `npm i babel-core babel-loader babel-plugin-transform-runtime babel-preset-env babel-preset-stage-0 -D`  
 - `npm i babel-preset-react -D`  
 

2.添加`.babelrc`配置文件   

 - 在webpack.config.js配置module  


		module.exports = {
		    mode:'production', //development 或者  production
		    //在webpack4中 约定大于配置  默认会去src下面找到index.js作为入口打包文件 所以不必设置entry入口
		    plugins:[//所有的插件
		        htmlPlugin
		    ],
		    module:{ //所有的第三发模块配置规则
		        rules:[
		            {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}, //exclude为排除项  不能忘记加
		        ]
		    }
		}

- 配置  `.babelrc`

		{
		    "presets": ["env","stage-0","react"],
		    "plugins": ["transform-runtime"],
		}
