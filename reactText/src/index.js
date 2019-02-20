
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