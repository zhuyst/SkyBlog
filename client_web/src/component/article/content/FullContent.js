import React from 'react'
import {connect} from "react-redux";

import ContentArea from "./ContentArea";
import CommentList from "./comment/CommentList";
import CommentSender from "./comment/CommentSender";
import Layout, {LAYOUT_FULL} from "./Layout";

import {initialArticle} from "../../../reducer/article/ContentReducer";

import {getArticleInfo} from "../../../action/article/ArticlesAction";
import {setArticle} from "../../../action/article/ContentAction";

class FullContent extends React.Component{
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
        const article = this.props.article;

        const contentArea = (
            <div>
                <div className="full_content">
                    <ContentArea/>
                </div>
                <CommentList/>
                <CommentSender/>
            </div>
        );

        return (
            <Layout type={LAYOUT_FULL} contentArea={contentArea}
                    article={article}/>
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
        getArticle : id =>{
            dispatch(getArticleInfo(id))
        },
        setArticle : article =>{
            dispatch(setArticle(article))
        }
    }
};

const FullContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FullContent);

export default FullContentContainer