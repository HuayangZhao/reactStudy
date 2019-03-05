import React from 'react'

class ComItem extends React.Component {
    render(){
        return <div className='comBox'>
            <h3>评论人：{this.props.user}</h3>
            <p>评论内容：{this.props.content}</p>
        </div>
    }
}
export default ComItem