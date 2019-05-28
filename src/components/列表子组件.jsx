import React from 'react'
import ComItem from './评论组件'
import ComStyle from '../style/comList.less'
import 'bootstrap/dist/css/bootstrap.css'
class ComList extends React.Component {
    constructor(){
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
    render(){
        return <div>
            {/* <h1 className='title' style={{color:'red'}}>这是评论列表</h1> */}
            {/* <h1 className={ComStyle.title} >这是评论列表</h1> */}
            <button className="btn btn-primary">按钮啊</button>
            {this.state.CommentList.map(item=><ComItem {...item} key={item.id}></ComItem>)}
        </div>
    }
}
export default ComList
