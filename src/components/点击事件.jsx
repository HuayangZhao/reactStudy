import React from 'react'

export default class Click extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: '我是一只小小小小鸟',
            text: '输入框的值'
        }
    }

    render() {
        // 在react中绑定事件要用驼峰命名 事件绑定必须是函数 标准绑定使用剪头函数
        return <div>
            {/* <button onClick={()=>{this.show()}}>按钮点击事件</button> */}
            <button onClick={() => this.show('方法被调用')} style={{marginRight: 20}}>按钮点击事件--{this.state.msg}</button>
            {/* 当 为 文本框绑定 value 值以后，要么提供一个 readOnly， 要么提供一个 onChange 处理函数 */}
            {/* 如果 我们只是把 文本框的 value 属性，绑定到了 state 状态，但是，如果不提供 onChagne 处理函数的话，得到的文本框，将会是一个只读的文本框 */}
            <input value={this.state.msg} onChange={(e) => this.change(e)}></input>
        </div>
    }

    show = (v) => {
        console.log(v)
        // this.setState({ msg: '123' })
        // console.log(this.state.msg) //'我是一只小小小小鸟' 因为setState是异步方法
        //想拿到异步值使用回调
        this.setState({msg: '123'}, function () {
            console.log(this.state.msg)
        })

    }
    change = (e) => {
        // 接收事件源参数获取value值设置给state state值再同步到页面上实现双向绑定
        const newVal = e.target.value
        this.setState({msg: newVal})
    }
}

