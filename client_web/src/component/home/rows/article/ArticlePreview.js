import React from 'react'
import {push} from 'react-router-redux'
import {connect} from "react-redux";
import {setArticle} from "../../../../action/article/ContentAction";

class ArticlePreview extends React.Component{
    render(){
        const {article,push} = this.props;

        return (
            <div className="home_article" onClick={() => push(article)}>
                <a>
                    <h4 className="home_article_title">{article.title}</h4>
                    <hr/>
                    <p className="home_article_content">{article.content}</p>
                    <p className="home_article_date">发布时间 : {article.create_date}</p>
                </a>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        push : article => {
            dispatch(setArticle(article));

            const path = `/article/content/${article.id}/full`;
            dispatch(push(path))
        }
    }
};

const ArticlePreviewContainer = connect(
    null,
    mapDispatchToProps
)(ArticlePreview);

export default ArticlePreviewContainer