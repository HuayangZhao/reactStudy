//1.导入包
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
    <Holle {...dog}></Holle>
</div>
ReactDOM.render(mydiv,document.getElementById('app'))