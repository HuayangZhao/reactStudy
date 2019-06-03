
import React from 'react'
import ReactDOM from 'react-dom'
// import Click from '@/components/点击事件'
import Add from '@/components/addNum'
const mydiv = <div>
    <Add number={100}></Add>
</div>
ReactDOM.render(mydiv,document.getElementById('app'))
