import React from 'react'
import ReactMarkdown from 'react-markdown'
import {PageHeader} from "react-bootstrap";
import {connect} from "react-redux";

import ArticleEditor from "./ArticleEditor";
import Article from "../Article";

import {initialArticle} from "../../../reducer/article/ContentReducer";
import {deleteArticle, getArticleInfo} from "../../../action/ArticlesAction";
import {setArticle} from "../../../action/article/ContentAction";

class EditContent extends React.Component{
    componentWillMount(){
        let action;

        const id = this.props.match.params.id;
        if(id === "new"){
            this.props.setArticle(initialArticle);
            action = "新增"
        }
        else {
            this.props.getArticle(id);
            action = "修改"
        }

        document.title = `${action} - ${this.props.article.title} - 博客文章 - 青云的小窝`;
    }

    render(){
        const {article} = this.props;
        const {title,sub_title,content} = article;

        const contentArea = (
            <ArticleEditor article={article} />
        );
        const right = (
            <div>
                <PageHeader>{title}  <small>{sub_title}</small></PageHeader>
                <ReactMarkdown source={content.text}/>
            </div>
        );

        return (
            <Article contentArea={contentArea}
                     right={right} article={article}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.article.article
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getArticle : id =>{
            dispatch(getArticleInfo(id))
        },
        setArticle : article =>{
            dispatch(setArticle(article))
        },
        deleteArticle : id => {
            dispatch(deleteArticle(id))
        }
    }
};

const EditContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContent);

export default EditContentContainer