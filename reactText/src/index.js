//1.导入包
import React from 'react'
import ReactDOM from 'react-dom'

// const mydiv = <div>
//     我是一个小鸭子
//     <h1>我是一个h1</h1>
// </div>
const mydiv = React.createElement('h1',{id:'myh1'},'我是H1')
ReactDOM.render(mydiv,document.getElementById('app'))