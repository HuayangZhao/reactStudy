
import React from 'react'
import ReactDOM from 'react-dom'

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
    123
    <Moven {...user}></Moven>
</div>
ReactDOM.render(mydiv,document.getElementById('app'))