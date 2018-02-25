import React from 'react'
import {Link} from "react-router-dom";

class ArticlePreview extends React.Component{
    render(){
        const article = this.props.article;
        const path = `/article/content/${article.id}/full`;

        return (
            <div className="home_article">
                <Link to={path}>
                    <h4 className="home_article_title">{article.title}</h4>
                    <p className="home_article_content">{article.content}</p>
                    <p className="home_article_date">发布时间 : {article.create_date}</p>
                </Link>
            </div>
        )
    }
}

export default ArticlePreview