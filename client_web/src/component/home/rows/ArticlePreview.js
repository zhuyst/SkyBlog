import React from 'react'
import { Link } from "react-router-dom";

class ArticlePreview extends React.Component{
    render(){
        const id = this.props.id;
        const path = `/article/${id}`;
        let className = this.props.isLast ? "home_article home_article_last" : "home_article";

        return (
            <div className={className}>
                <h4 className="home_article_title"><Link to={path}>文章id={id}</Link></h4>
                <p className="home_article_content"><Link to={path}>文章内容id={id}</Link></p>
            </div>
        )
    }
}

export default ArticlePreview