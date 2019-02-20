
import React from 'react'
import ReactDOM from 'react-dom'
// 创建父类
class Preson {
    constructor(name,age){
        this.name = name
        this.age = age
    }
    say(){
        console.log("HOLLE")
    }
}
// 继承父类用extends关键字
class Chinese extends Preson{
    constructor(name,age,IDNumber){ 
        //子类中的构造器中必须优先调用 super（）方法
        //super是一个函数 相当于父类的构造器 子类中的super相当于是父类constructor的一个引用
        //如果super调用没有传递参数 调用后实例上的name,age都会为undefined 因为super相当于调用父类的构造器，父类构造器没收到的参数

        // 身份证号是中国人独有的 所以身份证号不能放在父类上
        // this.IDNumber = IDNumber   super（）方法要优先调用 this不能放在super（）方法之前
        super(name,age,IDNumber)
        this.IDNumber = IDNumber
    }
}
let a2 = new Chinese("jack",20,'12513135*********3212')
console.log(a2)
a2.say()

class American extends Preson{
   //不写构造器时 new时会默认吧参数传递给父类
}
let a3 = new American("zhangsan",20)
console.log(a3)
a3.say()

const mydiv = <div>
    123
</div>
ReactDOM.render(mydiv,document.getElementById('app'))