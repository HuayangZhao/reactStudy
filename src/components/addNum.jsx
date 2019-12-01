    import React from 'react'
    import Types from 'prop-types'
    export default class AddNumber extends React.Component{
        // 这里的propTypes属性名不能变
        static propTypes = {
            number:Types.number.isRequired
        }
        // defaultProps 设置组件的默认属性值
        static defaultProps = {
            number:0
        }
        // constructor 构造器 组件的初始状态 也就是this.state中的数据
        constructor(props){
            super()
            this.state ={
                msg:'hahaha',
                // 这里等于props值
                // 注意：在 constructor，如果想访问 props 上的属性，不能直接使用 this.props.***
                // 在构造函数中，访问props, 只能在 constructor(props) 来进行接收
                num:props.number,
            }
        }
        // 组件初始化完毕 并且即将被渲染到页面之前触发
        componentWillMount(){
           console.log(this.state.msg); //能打印出来数据：hahaha
           console.log(document.getElementById('xxx')); // null 页面没渲染出来 所以获取不到
        }
        // 组件渲染 正在往页面上渲染
        render(){
            return <div>
                <button onClick={()=>{this.add()}}>点击按钮加数字</button>
                <h3 id={"xxx"}>当前数字为：{this.state.num}</h3>
            </div>
        }
        // 组件已经被渲染到页面了：此时页面中有了真正的DOM的元素，可以进行DOM相关的操作
        componentDidMount(){
            console.log(document.getElementById('xxx')) //这时候可以获取到 因为页面已经渲染完毕了
        }
        // 组件的 porps 被改变，会重新触发 componentWillRevceiveProps
        componentWillReceiveProps(nextProps){
            console.log(this.state.num,1111); //此时只是没有更新的 因为此时Props参数还没有跟新
            console.log('nextProps 中的number属性值是：' + nextProps.number)
            this.setState({ //在这个生命周期中把新的props赋值上去
                num: nextProps.number
            })
        }
        add=()=>{
            // this.props.number += 1 props是只读属性 是不能被改变的
            this.setState({num:this.state.num + 1})
        }
    }
