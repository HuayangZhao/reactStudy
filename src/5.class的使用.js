
import React from 'react'
import ReactDOM from 'react-dom'

// 以前
function Person(name,age){
    this.name = name
    this.age = age
}
Person.prototype.say = function(){
    console.log('这是实例方法，new出来的实例也能调用')
}
Person.show=function(){
    console.log('这是静态方法，Person.show（）')
}
Person.info = 'aaaa' //直接挂在到了构造函数身上 这是静态属性  new出来的对象无法使用

let a1 = new Person("lisi",20)
console.log(a1.info)  //undefined 访问不到
//通过构造函数直接访问
console.log(Person.info)
console.log(a1.name) //能通过new出来的实例访问到的属性 这是实例属性


//----------------------------------------------------------------------------------------


// class类
class American {
    constructor(name,age){
        this.name = name
        this.age = age
    }
    //在class内部 通过 static关键字 来标识属性属于静态
    static info = 'aaa'
    show(){
        console.log('这是实例方法，直接在class中写就行')
    }

    static say(){
        console.log('这是静态方法，要用static标识')
    }
}

let a2 = new American("jack",20)

console.log(a2.info)  //undefined 访问不到

//info是American的静态属性
console.log(American.info)

console.log(a2.age)

class Chinese {
    constructor(name,age){
        this.name = name
        this.age = age
    }
}
let a3 = new Chinese("zhangsan",20)
console.log(a3)

const mydiv = <div>
    123
</div>
ReactDOM.render(mydiv,document.getElementById('app'))