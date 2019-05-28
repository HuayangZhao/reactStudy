import React from 'react'
export default class SubList extends React.Component{
    constructor(){
        super()
    }
    render(){
        return <div className='comBox'>
            <h3>评论人：{this.props.user}</h3>
            <p>评论内容：{this.props.content}</p>
        </div>
    }
}
