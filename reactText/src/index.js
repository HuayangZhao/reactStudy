
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