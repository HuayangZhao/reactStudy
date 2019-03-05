// 导入react包时 名称固定
import React from 'react'
import ReactDOM from 'react-dom'

//创建虚拟DOM 
//参数1：创建元素的类型，字符串，表示元素的名称
//参数2：是一个对象或者null，表示当前这个DOM的元素属性
//参数3：子节点（包括其他的虚拟DOM 获取文本子节点）
//<h1 id='myh1'></h1>
const myh1 = React.createElement('h1',{id:'myh1'},'我是H1')

//使用ReactDOM把虚拟DOM渲染到页面上
//参数1：要渲染的虚拟DOM名
//参数2：指定页面上的容器
ReactDOM.render(myh1,document.getElementById('app'))