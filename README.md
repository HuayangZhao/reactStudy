# react从0到1


## webpack基本配置
1.新建文件夹
2.运行npm init -y,快速初始化项目  
3.在根目录新建src源代码目录和dist打包好的产品目录    
4.在src中新建页面（index.html）和入口文件main.js  
5.使用`npm i webpack webpack-cli -Dan`  
6.根目录下新建webpack.config.js配置文件  
### webpack3.6和webpack4的区别
- webpack3中打包构建可以在package.json中配置dev用webpack命令行打包   

   "dev": "webpack-dev-server --open --port 3000 --hot"

- webpack4中package.json新增了mode打包配置  

   ```
   module.exports = {
   		mode:'production',   //development 或者  production
   	}
   ```

- webpack4中把webpack和打包构建分开了，webpack4构建项目需要使用webpack-cli包来提供  

## npm run dev
- 配置完成后运行`npm run dev`在浏览器中打开项目

- 把html放置到虚拟内存中用到`npm i html-webpack-plugin -D`

- 在webpack.config.js中配置  

   ```
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
   ```

   

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

   ```
   {
       "presets": ["env","stage-0","react"],
       "plugins": ["transform-runtime"],
   }
   ```

   

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
    		let a2 = new Chinese("jack",20,'12513135*****3212')
    		console.log(a2)
    		a2.say()
    	class American extends Preson{
    	   //不写构造器时 new时会默认吧参数传递给父类
    	}
    	let a3 = new American("zhangsan",20)
    	console.log(a3)
    	a3.say()

- 使用class创建组件

    ```
    import React from 'react'
    	// import React, {Component} from 'react'   
    	//按需导入component 创建组件时候就可以直接写 class Moven extends Component {}
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
    ```

    

## class组件相关操作

- props组件传参（此参数是只读的）

  ```
  // 用class来创建组件 
  class Moven extends React.Component {  
      //接受组件参数直接this.props.name的方式
      render(){
          return <div>
              这是class创建的组件--{this.props.name}
              </div>
      }
  }
  let user={
      name:'zs',
      age:18
  }
  const mydiv = <div>
      123
      <Moven {...user}></Moven>
  </div>
  ReactDOM.render(mydiv,document.getElementById('app'))
  ```

- class创建组件和function创建函数的对比

  ```
  1.function构造函数创建组件是无状态的，叫做无状态组件
  2.通过class创建组件是有状态的，叫做有状态组件
  2.本质上的区别就是有没有state属性和生命周期函数
  ```

- class中的state属性

  ```
  // 用class来创建组件 
  class Moven extends React.Component { 
      constructor(){
          //因为moven组件继承了react.component 所以构造器中必须调用super
          super()
          //只有调用了super才能调用this
          this.state = { //这个this.state相当于vue中的data(){return{}}
              msg:'这是this.state中的消息'
          }
      }
      render(){
          return <div>
              这是class创建的组件--{this.props.name}
              <h4>{this.state.msg}</h4>
              </div>
      }
  }
  let user={
      name:'zs',
      age:18
  }
  const mydiv = <div>
      	<Moven {...user}></Moven>
  	</div>
  ReactDOM.render(mydiv,document.getElementById('app'))
  ```

  

## 评论列表案例

**1.拆分组件**

- 列表组件

```
import React from 'react'
// 导入 评论项 组件
import CmtItem from '@/components/CmtItem'
export default class CmtList extends React.Component {
  constructor() {
    super()
    this.state = {
      CommentList: [ // 评论列表数据
        { id: 1, user: '张三', content: '哈哈，沙发' },
        { id: 2, user: '李四', content: '哈哈，板凳' },
        { id: 3, user: '王五', content: '哈哈，凉席' },
        { id: 4, user: '赵六', content: '哈哈，砖头' },
        { id: 5, user: '田七', content: '哈哈，楼下山炮' }
      ]
    }
  }
  render() {
    return <div>
      <h1>这是评论列表组件</h1>
      {this.state.CommentList.map(item => <CmtItem {...item} key={item.id}></CmtItem>)}
    </div>
  }
}
```

- 评论组件

```
import React from 'react'
class ComItem extends React.Component {
    render(){
        return <div className='comBox'>
            <h3>评论人：{this.props.user}</h3>
            <p>评论内容：{this.props.content}</p>
        </div>
    }
}
export default ComItem
```

- index.js

```
import React from 'react'
import ReactDOM from 'react-dom'
import ComList from './components/列表子组件'
const mydiv = <div>
    <ComList></ComList>
</div>
ReactDOM.render(mydiv,document.getElementById('app'))
```

**2.style样式的应用**

- 行内样式

  ```
  import React from 'react'
  // 导入 评论项 组件
  import CmtItem from '@/components/CmtItem'
  export default class CmtList extends React.Component {
    constructor() {
      super()
      this.state = {
        CommentList: [ // 评论列表数据
          { id: 1, user: '张三', content: '哈哈，沙发' },
          { id: 2, user: '李四', content: '哈哈，板凳' },
          { id: 3, user: '王五', content: '哈哈，凉席' },
          { id: 4, user: '赵六', content: '哈哈，砖头' },
          { id: 5, user: '田七', content: '哈哈，楼下山炮' }
        ]
      }
    }
    render() {
      return <div>
        {/* 注意：在 JSX 中，如果想写 行内样式了，不能 为 style 设置 字符串的值，如<h1 style="color:red;"> */}
        {/* 而是应该 这么写：    style={ { color: 'red' } } */}
        {/* 在 行内样式中，如果 是 数值类型的样式，则可以不用引号包裹，如果是 字符串类型的 样式值，必须使用 引号包裹 */}
        <h1 style={{ color: 'red', fontSize: '35px', zIndex: 3, fontWeight: 200, textAlign: 'center' }}>这是评论列表组件</h1>
        {this.state.CommentList.map(item => <CmtItem {...item} key={item.id}></CmtItem>)}
      </div>
    }
  }
  ```

  

- 导入样式文件

  ```
  style样式文件comList.css
  .title {
      font-weight: 200;
      color: red;
      text-align: center;
  }
  .comBox {
      border: 1px dashed #ccc;
      box-shadow: 0 0 10px #ccc;
      margin: 10px;
      padding: 10PX;
  }
  h3 {
      font-size: 16px;
  }
  p {
      font-size: 14px;
  }
  
  ===================================
  
  import React from 'react'
  import ComItem from './评论组件'
  import ComStyle from '../style/comList.css'
  class ComList extends React.Component {
      constructor(){
          super() 
          this.state = {
              CommentList: [ // 评论列表数据
                { id: 1, user: '张三', content: '哈哈，沙发' },
                { id: 2, user: '李四', content: '哈哈，板凳' },
                { id: 3, user: '王五', content: '哈哈，凉席' },
                { id: 4, user: '赵六', content: '哈哈，砖头' },
                { id: 5, user: '田七', content: '哈哈，楼下山炮' }
              ]
            }
      }
      render(){
          return <div>
              <h1 className='title' >这是评论列表</h1>
              {this.state.CommentList.map(item=><ComItem {...item} key={item.id}></ComItem>)}
          </div>
      }
  }
  export default ComList
  ```

  **因为style样式没有作用域，直接导入 css 样式表，默认是在全局上，整个项目都生效的！Vue 组件中的样式表，也有冲突的问题；但是，可以使用 <style scoped></style>，但是React 中，没有类似于 scoped 这样的指令，React 中根本就没有指令的概念，在React 中想要为css设置模块化，我们需要配置webpack**

  - webpack配置CSS模块化

    ```
     module:{ //所有的第三发模块配置规则
            rules:[
            	//exclude为排除项  不能忘记加
                {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}, 
                { 
                    test: /\.css$/, use: ['style-loader', 'css-loader?modules']
                }  
            ],
     }
    ```

    **  css-loader后面加参数和URL携带参数格式类似，modules代表把样式模块化**

    ```
    style样式文件comList.css
    .title {
        font-weight: 200;
        color: red;
        text-align: center;
    }
    .comBox {
        border: 1px dashed #ccc;
        box-shadow: 0 0 10px #ccc;
        margin: 10px;
        padding: 10PX;
    }
    h3 {
        font-size: 16px;
    }
    p {
        font-size: 14px;
    }
    
    ===================================
    
    import ComStyle from '../style/comList.css'
    console.log(ComStyle)
    //没有加模块化前 打印为空 样式全局生效
    //加上模块化，打印为{title: "_10QwVNiVj0mzxXl5_vuLVT", comBox: "_3Ef1gVratXBW6Nz9oek627"}，样式当前文件生效
    用法：<h1 className={ComStyle.title} >这是评论列表</h1>
    ```

    **注意：样式模块化只对类名选择器和ID选择器有用，对标签选择器无用**

    - 配置类名

      ```
      module:{ //所有的第三发模块配置规则
              rules:[
              	//exclude为排除项  不能忘记加
                  {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}, 
                  { 
                      test: /\.css$/, use: ['style-loader', 
                      'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]']
                  }  
              ],
       }
      ```

      **localIdentName为自定义模块化类名**

      1.path：代表当前样式文件所在文件夹的路径   {title: "src-style-", comBox: "src-style-"}；

      2.name：代表样式文件名称  {title: "src-style-comList", comBox: "src-style-comList"}；

      3.local：表示当前选择器名称  {title: "src-style-comList-title", comBox: "src-style-comList-comBox"}

      4.hash:length：表示hash值，默认32位，length限定取前几位  {title: "src-style-comList-title-77fe7", comBox: "src-style-comList-comBox-87605"}

- local和global设置选择器是否被模块化

  ```
  /* 注意： 被 :local() 包裹起来的类名，会被模块化； 默认情况下， 所有的类名和ID，都被 模块化了； */
  .title{
    color: red;
    text-align: center;
    font-weight: 200;
  }
  
  /* css 模块化，只针对 类选择器 和 Id选择器生效 */
  /* CSS 模块化 不会 将 标签选择器模块化 */
  /* h1{
    font-style: italic;
  } */
  
  /* 注意：被 :global() 包裹起来的类名，不会被模块化，而是会全局生效； */ 
  :global(.test){
    font-style: italic;
  }
  ```


**3.引用第三方UI**

```
import ComStyle from '../style/comList.less'
//引入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css'
class ComList extends React.Component {
    constructor(){
        super() 
        this.state = {}
    }
    render(){
        return <div>
         	<h1 className={ComStyle.title} >这是评论列表</h1>
            //  <button className="btn btn-primary">按钮啊</button>  发现这么引用是错误的
            //原因是在webpack中配置了css样式模块化，bootstrap样式会被编译
        </div>
    }
}
```

**为了能够方便的引用第三方UI，自己规定，自己书写的样式都用less或者scss，第三方UI用css，这样就能区别编译**

- webpack 区别编译

```
 module:{ //所有的第三发模块配置规则
        rules:[
            {test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}, //exclude为排除项  不能忘记加
            { test: /\.css$/, use: ['style-loader', 'css-loader']}, //第三方UI不适用模块化编译
            { test: /\.less$/, use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','less-loader']},
            { test: /\.ttf|woff2|woff|eot|svg$/, use: ['url-loader']},   //配置字体图标  
                             
        ]
    },
```

## 点击事件

1.绑定点击事件

```
import React from 'react'
export default class Click extends React.Component {
    constructor(){
        super()
        this.state = {}
    }
    render(){
        // 在react中绑定事件要用驼峰命名 事件绑定必须是函数 标准绑定使用剪头函数
        return <div>
            {/* <button onClick={()=>{this.show()}}>按钮点击事件</button> */}
            <button onClick={() => this.show('方法被调用')}>按钮点击事件</button>            
            </div>
    }
    show=(v)=>{
        console.log(v)
    }
}

```

2.改变state的值，用setState

- 不建议使用下面方法

```
import React from 'react'
export default class Click extends React.Component {
    constructor(){
        super()
        this.state = {
            msg:'我是一只小小小小鸟'
        }
    }
    render(){
        // 在react中绑定事件要用驼峰命名 事件绑定必须是函数 标准绑定使用剪头函数
        return <div>
            {/* <button onClick={()=>{this.show()}}>按钮点击事件</button> */}
            <button onClick={() => this.show('方法被调用')}>按钮点击事件--{this.state.msg}</button>            	{/*点击按钮后  按钮中的this.state.msg 依旧是'我是一只小小小小鸟'*/}
            </div>
    }
    show=(v)=>{
        console.log(v)
        this.state.msg = '我被改变了' //这样可以更改，但是只是页面上的数据不会更新
        console.log(this.state.msg) // 打印'我被改变了'
    }
}
```

- 建议使用此方法

```
import React from 'react'
export default class Click extends React.Component {
    constructor(){
        super()
        this.state = {
            msg:'我是一只小小小小鸟',
            age:28
        }
    }
    render(){
        // 在react中绑定事件要用驼峰命名 事件绑定必须是函数 标准绑定使用剪头函数
        return <div>
            {/* <button onClick={()=>{this.show()}}>按钮点击事件</button> */}
            <button onClick={() => this.show('方法被调用')}>按钮点击事件--{this.state.msg}</button>            
            </div>
    }
    show=(v)=>{
        console.log(v)
        this.setState({ msg: '123' }) //这样设置点击按钮后按钮中的msg也会更改
        this.setState({ msg: '123' },function(){console.log(this.state.msg)})//这里打印的就是更新后的值
        console.log(this.state.msg) //这里依旧会打印'我是一只小小小小鸟' 因为this.setState是异步方法
    }
    //在 setState ，只会把 对应的 state 状态更新，而不会 覆盖其它的 state 状态,更改后state中的age依旧存在
    //如果在调用完 this.setState 之后，又想立即拿到 最新的 state 值，需要使用 this.setState({}, callback)
}

```

2.实现输入框双向绑定

```
import React from 'react'
export default class Click extends React.Component {
    constructor(){
        super()
        this.state = {
            msg:'我是一只小小小小鸟',
            text:'输入框的值'
        }
    }
    render(){
        return <div>
            {/* 当 为 文本框绑定 value 值以后，要么同时提供一个 readOnly， 要么，提供一个 onChange 处理函数 */}
            {/* 如果 我们只是把 文本框的 value 属性，绑定到了 state 状态，但是，如果不提供 onChagne 处理函数的话，得到的文本框，将会是一个只读的文本框 */}
            <input value={this.state.text} onChange={(e)=>this.change(e)}></input>            
            </div>
    }
    change=(e)=>{
    // 接收事件源参数获取value值设置给state state值再同步到页面上实现双向绑定
   const newVal = e.target.value
    this.setState({
        text: newVal
    })
    }
}
```

## 使用 PropTypes 进行类型检查

`npm i prop-types`

如页面上有个数值类型的参数，这是后属性校验是很有必要的

```
import React from 'react'
import Types from 'prop-types'
export default class AddNumber extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    //这里的propTypes属性名不能变
    static propTypes = {
        number:Types.number.isRequired //传递的number参数 要求是数值类型并且必填
    }
    render(){
        return <div>
            <button>点击按钮加数字</button>
            <h3>当前数字为：{this.props.number}</h3>
        </div>
    }
}
----------------------------------
import Add from '@/components/addNum'
const mydiv = <div>
    <Add number = {100}></Add>
    <hr/>
    <Add  number = {"字符串"}></Add>
</div>
```

这里只能显示是数字，结果传了一个字符串，设置propTypes属性后 ，页面会报错，

具体可查看文档： <https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html> 

## 给属性设置默认值

`defaultProps` 可以为组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。 

```
import React from 'react'
import Types from 'prop-types'
export default class AddNumber extends React.Component{
    //这里的propTypes属性名不能变
    static propTypes = {
        number:Types.number.isRequired
    }
    //默认number为0 
    static defaultProps = {
        number:0  
    }
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return <div>
            <button onClick={()=>{this.props.number+1}}>点击按钮加数字</button>
            <h3>当前数字为：{this.props.number}</h3>
        </div>
    }
}
----------------------------------
import Add from '@/components/addNum'
const mydiv = <div>
    <Add number = {100}></Add>
    <hr/>
    <Add></Add> //这里没有传参 但最终会渲染出一个0在这里
</div>
```

## react的生命周期

#### 初始化阶段

```
 import React from 'react'
    import Types from 'prop-types'
    export default class AddNumber extends React.Component{
        //这里的propTypes属性名不能变
        static propTypes = {
            number:Types.number.isRequired
        }
        // 1.defaultProps 设置组件的默认属性值
        static defaultProps = {
            number:0
        }
        // 2.constructor 构造器 组件的初始状态 也就是this.state中的数据
        constructor(){
            super()
            this.state ={
                msg:'hahaha'
            }
        }
        // 3.组件初始化完毕 并且即将被渲染到页面之前触发
        componentWillMount(){
             console.log(this.state.msg); //能打印出来数据：hahaha
            console.log(document.getElementById('xxx')); // null 页面没渲染出来 所以获取不到
        }
        // 4.组件渲染 正在往页面上渲染
        render(){
            return <div>
                <button onClick={()=>{this.props.number+1}}>点击按钮加数字</button>
                <h3 id={"xxx"}>当前数字为：{this.props.number}</h3>
            </div>
        }
        // 5.组件已经被渲染到页面了：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作
        componentDidMount(){
            console.log(document.getElementById('xxx')) //这时候可以获取到 因为页面已经渲染完毕了
        }
    }
```

#### 运行阶段

现在点击按钮 让数值加1

```
	import React from 'react'
    import Types from 'prop-types'
    export default class AddNumber extends React.Component{
        // 这里的propTypes属性名不能变
        static propTypes = {
            number:Types.number.isRequired
        }
        // defaultProps 设置组件的默认属性值
        static defaultProps = {
            number:0
        }
        // constructor 构造器 组件的初始状态 也就是this.state中的数据
        constructor(props){
            super()
            this.state ={
                msg:'hahaha',
                // 这里等于props值
                // 注意：在 constructor，如果想访问 props 上的属性，不能直接使用 this.props.***
                // 在构造函数中，访问props, 只能在 constructor(props) 来进行接收
                num:props.number,
            }
        }
        // 组件初始化完毕 并且即将被渲染到页面之前触发
        componentWillMount(){
             console.log(this.state.msg); //能打印出来数据：hahaha
            console.log(document.getElementById('xxx')); // null 页面没渲染出来 所以获取不到
        }
        // 组件渲染 正在往页面上渲染
        render(){
            return <div>
                <button onClick={()=>{this.add()}}>点击按钮加数字</button>
                <h3 id={"xxx"}>当前数字为：{this.state.num}</h3>
            </div>
        }
        // 组件已经被渲染到页面了：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作
        componentDidMount(){
            console.log(document.getElementById('xxx')) //这时候可以获取到 因为页面已经渲染完毕了
        }
        -----------------------------------
   //props是只读属性 是不能被改变的
       add=()=>{
            this.props.number += 1
        }
   ------------------------------------
   //能被改变的也就this.state中的数据了，每次点击可以把prop赋值给state 然后把state同步到界面
        add=()=>{
            this.setState({num:this.state.num + 1})
        }
    }

```

#### 属性改变

嵌套父子组件  点击一个按钮使父与子组件的值都加1

```
父组件
import React from 'react'
import ReactDOM from 'react-dom'
// import Click from '@/components/点击事件'
import Add from '@/components/addNum'
class Parend extends React.Component{
    constructor(){
        super()
        this.state = {
            shuzi:101
        }
    }
    render(){
        return <div>
            <button onClick={()=>{this.addAll()}}>点击按钮使两个值都+1</button>
            <h4>这个数字要和下面的同步：{this.state.shuzi}</h4>
            <Add number={this.state.shuzi}></Add>
        </div>
    }
    addAll=()=>{
       this.setState({shuzi:this.state.shuzi+1})
    }
}
const mydiv = <div>
    <Parend></Parend>
</div>
ReactDOM.render(mydiv,document.getElementById('app'))
```

```
子组件
import React from 'react'
    import Types from 'prop-types'
    export default class AddNumber extends React.Component{
        // 这里的propTypes属性名不能变
        static propTypes = {
            number:Types.number.isRequired
        }
        // defaultProps 设置组件的默认属性值
        static defaultProps = {
            number:0
        }
        // constructor 构造器 组件的初始状态 也就是this.state中的数据
        constructor(props){
            super()
            this.state ={
                msg:'hahaha',
                // 这里等于props值
                // 注意：在 constructor，如果想访问 props 上的属性，不能直接使用 this.props.***
                // 在构造函数中，访问props, 只能在 constructor(props) 来进行接收
                num:props.number,
            }
        }
        // 组件初始化完毕 并且即将被渲染到页面之前触发
        componentWillMount(){
           console.log(this.state.msg); //能打印出来数据：hahaha
           console.log(document.getElementById('xxx')); // null 页面没渲染出来 所以获取不到
        }
        // 组件渲染 正在往页面上渲染
        render(){
            return <div>
                <button onClick={()=>{this.add()}}>点击按钮加数字</button>
                <h3 id={"xxx"}>当前数字为：{this.state.num}</h3>
            </div>
        }
        // 组件已经被渲染到页面了：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作
        componentDidMount(){
            console.log(document.getElementById('xxx')) //这时候可以获取到 因为页面已经渲染完毕了
        }
        // 组件的 porps 被改变，会重新触发 componentWillRevceiveProps
        componentWillReceiveProps(nextProps){
            console.log(this.state.num,1111); //此时只是没有更新的 因为此时Props参数还没有跟新
            console.log('nextProps 中的number属性值是：' + nextProps.number)
            this.setState({ //在这个生命周期中把新的props赋值上去
                num: nextProps.number
            })
        }
        add=()=>{
            // this.props.number += 1 props是只读属性 是不能被改变的
            this.setState({num:this.state.num + 1})
        }
    }
```

此处点击父组件按钮  如果没调用componentWillReceiveProps周期函数 为什么父组件值个跟新了 子组件没跟新？

```
当点击父组件按钮  改变state状态值 状态改变就会触发生命周期去更新组件 会重新render  此时状态改变了  但是子组件还是原来的子组件 根据react中的diff算法 子组件的生命周期函数是不会重新render的  所以子组件的值依旧不会改变 需要调用`componentWillReceiveProps`来改变子组件的值
```

####  shouldComponentUpdate ，componentWillUpdate ，componentDidUpdate 

```
这三个生命周期包括render中不可改变state中的状态值，因为状态值改变就会触发这几个生命周期函数 在这几个函数中再改变状态  这样就造成了死循环 而其他生命周期函数中不存在这种情况
```



