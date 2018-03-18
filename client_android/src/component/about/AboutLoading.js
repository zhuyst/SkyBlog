import React from 'react'

class AboutLoading extends React.Component{
    render(){
        return (
            <div className="content_loading">
                <i className="fa fa-5x fa-spinner fa-spin" />
                <br/>
                <h1>
                    加载中...
                </h1>
            </div>
        )
    }
}

export default AboutLoading