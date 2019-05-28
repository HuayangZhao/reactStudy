import React from 'react'
import Sublist from './subList'
import '@/style/comList.less'
export default class List extends React.Component{
    constructor() {
        super()
        this.state = {
            CommentList: [ // 评论列表数据
                { id: 1, user: '张三', content: '哈哈，沙发' },
                { id: 2, user: '李四', content: '哈哈，板凳' },
                { id: 3, user: '王五', content: '哈哈，凉席' },
                { id: 4, user: '赵六', content: '哈哈，砖头' },
                { id: 5, user: '田七', content: '哈哈，楼下山炮' }
            ]
        }
    }
    render() {
        return <div>
            <h1 className='title'>这是评论列表组件</h1>
            {this.state.CommentList.map(item => <Sublist {...item} key={item.id}></Sublist>)}
        </div>
    }
}
