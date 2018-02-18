import React from 'react'
import {Alert, Button, ButtonGroup, Glyphicon} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'

import {setArticle} from "../../../action/article/ContentAction";
import {deleteArticle, getArticleInfo} from "../../../action/article/ArticlesAction";
import {initialArticle} from "../../../reducer/article/ContentReducer";

import CommentSender from './comment/CommentSender'
import CommentList from './comment/CommentList'
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

        let sender;
        if(login.ok){
            sender = (
                <CommentSender/>
            )
        }
        else {
            sender = (
                <div className="pager">
                    <Alert bsStyle="info">
                        <span className="more_left">
                            <i className="fa fa-warning fa-lg"/>
                        </span>
                        需要登录后才能进行评论
                        <span className="more_right">
                            <i className="fa fa-warning fa-lg"/>
                        </span>
                    </Alert>
                </div>
            )
        }

        const contentArea = (
            <div>
                <ArticleTitle article={article}/>
                {
                    user.admin &&
                    <ButtonGroup>
                        <Button bsStyle="primary" className="edit_button"
                                onClick={() => editContent(id)}>
                            <Glyphicon glyph="edit" />&nbsp;&nbsp;编辑&nbsp;
                        </Button>
                        <Button bsStyle="danger"
                                onClick={() => deleteArticle(id)}>
                            <Glyphicon glyph="remove-sign" />
                            &nbsp;&nbsp;删除&nbsp;</Button>
                    </ButtonGroup>
                }
                <ReactMarkdown source={content.text}/>
            </div>
        );

        const right = (
            <div>
                <CommentList/>
                {sender}
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