import React from 'react'

class ContentLoading extends React.Component{
    render(){
        return (
            <div className="content_loading">
                <i className="fa fa-5x fa-spinner fa-spin" />
                <br/>
                <h1>
                    文章加载中...
                </h1>
            </div>
        )
    }
}

export default ContentLoading