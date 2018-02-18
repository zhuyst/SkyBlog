import React from 'react'
import { Link } from "react-router-dom";

class ArticlePreview extends React.Component{
    render(){
        const article = this.props.article;
        const path = `/article/content/${article.id}`;
        let className = this.props.isLast ? "home_article home_article_last" : "home_article";

        return (
            <div className={className}>
                <h4 className="home_article_title"><Link to={path}>{article.title}</Link></h4>
                <p className="home_article_sub_title"><Link to={path}>{article.sub_title}</Link></p>
            </div>
        )
    }
}

export default ArticlePreview