// 这里用到了JXS，要导入React
import React from 'react'

export default function Holle(props){
    return <div>这是HOLLE组件--{props.name}--{props.age}--{props.gender}</div>
}