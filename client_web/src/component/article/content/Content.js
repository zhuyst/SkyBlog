import React from 'react'
import {Button, ButtonGroup, PageHeader} from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'

import {setArticle} from "../../../action/article/ContentAction";
import {deleteArticle, getArticleInfo} from "../../../action/ArticlesAction";
import {initialArticle} from "../../../reducer/article/ContentReducer";

import CommentSender from './CommentSender'
import CommentList from './CommentList'
import Article from "../Article";

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
        const {article,
            editContent, deleteArticle} = this.props;
        const {id,title,sub_title,content} = article;

        const contentArea = (
            <div>
                <PageHeader>{title}  <small>{sub_title}</small></PageHeader>
                {
                    this.props.admin &&
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
                <CommentSender/>
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
        admin : state.login.user.admin
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