import React from 'react'
import {Button, ButtonGroup} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'

import {setArticle} from "../../../action/article/ContentAction";
import {deleteArticle, getArticleInfo} from "../../../action/article/ArticlesAction";
import {initialArticle} from "../../../reducer/article/ContentReducer";

import CommentSender from './CommentSender'
import CommentList from './CommentList'
import Article from "./Article";
import ArticleTitle from "./ArticleTitle";

import '../../../static/css/article/content.css'

class Content extends React.Component{
    componentWillMount(){
        document.title = `${this.props.article.title} - 博客文章 - 青云的小窝`;

        const id = this.props.match.params.id;
        if(id === "new"){
            this.props.setArticle(initialArticle);
        }
        else {
            this.props.getArticle(id);
        }
    }

    render(){
        const {article,login,
            editContent, deleteArticle} = this.props;
        const user = login.user;
        const {id,content} = article;

        const contentArea = (
            <div>
                <ArticleTitle article={article}/>
                {
                    user.admin &&
                    <ButtonGroup>
                        <Button bsStyle="primary" className="edit_button"
                                onClick={() => editContent(id)}>编辑</Button>
                        <Button bsStyle="danger"
                                onClick={() => deleteArticle(id)}>删除</Button>
                    </ButtonGroup>
                }
                <ReactMarkdown source={content.text}/>
            </div>
        );

        const right = (
            <div>
                <CommentList/>
                {
                    login.ok &&
                    <CommentSender/>
                }
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
        article : state.article,
        login : state.login
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
        },
        editContent : id => {
            dispatch(push(`/article/${id}/edit`))
        }
    }
};

const ContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);

export default ContentContainer