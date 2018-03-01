import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Clearfix} from "react-bootstrap";
import {connect} from "react-redux";

import ArticleTitle from "./ArticleTitle";
import {deleteArticle} from "../../../action/article/ContentAction";

class ContentArea extends React.Component{

    render(){
        const article = this.props.article;

        return (
            <div className="content_main">
                <ArticleTitle editing={false}/>
                <Clearfix>
                    <ReactMarkdown source={article.content.text}/>
                </Clearfix>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.content.article
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteArticle : id => {
            dispatch(deleteArticle(id))
        }
    }
};

const ContentAreaContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentArea);

export default ContentAreaContainer