import React from 'react'

export default class PostCom extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return <div>
            <div className="panel form-inline">
                <div className="panel-heading">
                    <h3 className="panel-title">Panel title</h3>
                </div>
                <div className="panel-body form-inline">
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">发表人</span>
                        <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">发表内容</span>
                        <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn btn-default" onClick={()=>this.postCom()}>提交评论</button>
                    </div>
                </div>
            </div>
        </div>
    }
    postCom(){
        alert(1)
    }
}
