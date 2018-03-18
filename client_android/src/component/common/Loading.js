import React from 'react'

class Loading extends React.Component{
    render(){
        return (
            <div className="loading">
                <h2>
                <i className="fa fa-lg fa-spinner fa-spin" />
                &nbsp;加载中...
                </h2>
            </div>
        )
    }
}

export default Loading