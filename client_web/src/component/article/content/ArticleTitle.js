import React from 'react'
import {PageHeader} from "react-bootstrap";

class ArticleTitle extends React.Component{
    render(){
        const {title,sub_title} = this.props.article;
        return (
            <PageHeader>
                {title}
                <br/>
                <small>{sub_title}</small>
            </PageHeader>
        )
    }
}

export default ArticleTitle;