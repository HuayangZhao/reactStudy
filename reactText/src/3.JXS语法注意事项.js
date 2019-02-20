//1.导入包
import React from 'react'
import ReactDOM from 'react-dom'
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
// 在JXS中类名需要用className 不能用class   label中的for要用htmlFor
ReactDOM.render(<div>
    <p className="myP">这是一个数字：{a}</p>
    {arr}
    {arrStr.map(item=><h5 key="item">{item}</h5>)}
    <label htmlFor="dlskfk">111</label>
</div>,document.getElementById('app'))