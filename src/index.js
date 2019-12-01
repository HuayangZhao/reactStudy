
import React from 'react'
import ReactDOM from 'react-dom'
// import Click from '@/components/点击事件'
import Add from '@/components/addNum'
import List from '@/components/list'
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
    <List></List>
</div>
ReactDOM.render(mydiv,document.getElementById('app'))
