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

3.在JSX语法中需要用JS的地方就需要用{},在JXS中类名需要用className 不能用class   label中的for要用htmlFor

		let a = 10 
		
		// 在JSX语法中 html标签可以看成是一个对象
		let arr = [
		    <h1>之类的开发商</h1>,
		    <h3>阿萨德发的</h3>
		]
		let arrStr = ['sdfsd','sdfsadf','sadfasdf','asdfasdfs']
		// let strArr = []
		// arrStr.forEach(item=>{
		//     strArr.push(<h5>{item}</h5>)
		// })
		
		// 在JSX中需要用JS的地方就需要用{}
		ReactDOM.render(<div>
		    <p className="myP">这是一个数字：{a}</p>
		    {arr}
		    {arrStr.map(item=><h5>{item}</h5>)}
 			<label htmlFor="dlskfk">111</label>
		</div>,document.getElementById('app'))

## 创建组件
1.使用构造函数创建组件  

	import React from 'react'
	import ReactDOM from 'react-dom'
	
	// 用构造函数创建组件  必须要return 负责报错 return null 则渲染未空白
	// props来传递参数
	function Holle(props){
	    return <div>这是HOLLE组件--{props.name}--{props.age}--{props.gender}</div>
	}
	let dog = {
	    name:'大黄',
	    gender:'母的',
	    age:18
	}
	const mydiv = <div>
	    {/* <Holle name={dog.name} age={dog.age}></Holle> */}
		{/* {es6语法} */}
	    <Holle {...dog}></Holle>
	</div>
	ReactDOM.render(mydiv,document.getElementById('app'))

2.使用jsx文件创建组件  
  
 - 新建`Holle.jsx`文件  
 
		// 这里用到了JXS，要导入React
		import React from 'react'
		
		export default function Holle(props){
		return <div>这是HOLLE组件--{props.name}--{props.age}--{props.gender}</div>
		}
		
		//export default Holle

 - 把jsx文件导入`index.js`中  

		import React from 'react'
		import ReactDOM from 'react-dom'

		// 导入jsx组件
		import Holle from './components/Holle.jsx'

		let dog = {
		    name:'大黄',
		    gender:'母的',
		    age:18
		}
		const mydiv = <div>
		    {/* <Holle name={dog.name} age={dog.age}></Holle> */}
			{/* {es6语法} */}
		    <Holle {...dog}></Holle>
		</div>
		ReactDOM.render(mydiv,document.getElementById('app'))
		 
3.使用`class`类创建组件  

 - 先了解class使用方式
 
		// 以前
		function Person(name,age){
		    this.name = name
		    this.age = age
		}
		Person.prototype.say = function(){
		    console.log('这是实例方法，new出来的实例也能调用')
		}
		Person.show=function(){
		    console.log('这是静态方法，Person.show（）')
		}
		Person.info = 'aaaa' //直接挂在到了构造函数身上 这是静态属性  new出来的对象无法使用
		
		let a1 = new Person("lisi",20)
		console.log(a1.info)  //undefined 访问不到
		//通过构造函数直接访问
		console.log(Person.info)
		console.log(a1.name) //能通过new出来的实例访问到的属性 这是实例属性
		
		//----------------------------分割线----------------------------------------------------
		
		// class类
		class Chinese {
		    constructor(name,age){
		        this.name = name
		        this.age = age
		    }
		    //在class内部 通过 static关键字 来标识属性属于静态
		    static info = 'aaa'
		    show(){
		        console.log('这是实例方法，直接在class中写就行')
		    }
		
		    static say(){
		        console.log('这是静态方法，要用static标识')
		    }
		}
		
		let a2 = new Chinese("jack",20)
		
		console.log(a2.info)  //undefined 访问不到
		
		//info是Chinese的静态属性
		console.log(Chinese.info)
		
		console.log(a2.age)

- class的继承  

		// 创建父类
		class Preson {
		    constructor(name,age){
		        this.name = name
		        this.age = age
		    }
		    say(){
		        console.log("HOLLE")
		    }
		}

		// 继承父类用extends关键字
		class Chinese extends Preson{
		    constructor(name,age,IDNumber){ 
		        //子类中的构造器中必须优先调用 super（）方法
		        //super是一个函数 相当于父类的构造器 子类中的super相当于是父类constructor的一个引用
		        //如果super调用没有传递参数 调用后实例上的name,age都会为undefined 因为super相当于调用父类的构造器，父类构造器没收到的参数
		
		        // 身份证号是中国人独有的 所以身份证号不能放在父类上
		        // this.IDNumber = IDNumber   super（）方法要优先调用 this不能放在super（）方法之前
		        super(name,age,IDNumber)
		        this.IDNumber = IDNumber
		    }
		}
		let a2 = new Chinese("jack",20,'12513135*********3212')
		console.log(a2)
		a2.say()
		
		class American extends Preson{
		   //不写构造器时 new时会默认吧参数传递给父类
		}
		let a3 = new American("zhangsan",20)
		console.log(a3)
		a3.say()

- 使用class创建组件


		import React from 'react'
		// import React, {Component} from 'react'   按需导入component 创建组件时候就可以直接写 class Moven extends Component {}
		import ReactDOM from 'react-dom'
		
		// 用class来创建组件 
		class Moven extends React.Component { 
		    // 1.要用react组件 所有的类都属于React.Component这个父类
		    // 2.组件内部必须用render函数 返回虚拟DOM
		    // 3.render函数中必须要有return  
		    render(){
		        return <div>这是class创建的组件</div>
		    }
		}
		const mydiv = <div>
		    123
		    <Moven></Moven>
		</div>
		ReactDOM.render(mydiv,document.getElementById('app'))