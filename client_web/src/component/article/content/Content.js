import React from 'react'
import {Alert} from "react-bootstrap";
import { connect } from 'react-redux'

import {setArticle} from "../../../action/article/ContentAction";
import {getArticleInfo} from "../../../action/article/ArticlesAction";
import {initialArticle} from "../../../reducer/article/ContentReducer";

import CommentSender from './comment/CommentSender'
import CommentList from './comment/CommentList'
import JustifyLayout from "./JustifyLayout";
import ContentArea from "./ContentArea";

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
        const {article,login} = this.props;

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

        const right = (
            <div>
                <CommentList/>
                {sender}
            </div>
        );

        return (
            <JustifyLayout contentArea={<ContentArea/>}
                     right={right} article={article}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.content.article,
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
        }
    }
};

const ContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);

export default ContentContainer