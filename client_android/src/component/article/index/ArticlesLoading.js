import React from 'react'
import {Alert} from "react-bootstrap";

class ArticlesLoading extends React.Component{
    render(){
        return (
            <Alert bsStyle="warning" className="articles_loading">
                <i className="fa fa-5x fa-spinner fa-spin" />
                <br/>
                <h1>
                    文章加载中...
                </h1>
            </Alert>
        )
    }
}

export default ArticlesLoading