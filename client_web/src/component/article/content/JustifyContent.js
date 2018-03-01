import React from 'react'
import { connect } from 'react-redux'

import {setArticle} from "../../../action/article/ContentAction";
import {getArticleInfo} from "../../../action/article/ArticlesAction";
import {initialArticle} from "../../../reducer/article/ContentReducer";

import CommentSender from './comment/CommentSender'
import CommentList from './comment/CommentList'
import Layout, {LAYOUT_JUSTIFY} from "./Layout";
import ContentArea from "./ContentArea";

import '../../../static/css/article/content.css'
import ArticleBreadcrumb from "./ArticleBreadcrumb";

class JustifyContent extends React.Component{
    componentWillMount(){
        const {setArticle,getArticle,article} = this.props;
        const id = this.props.match.params.id;

        if(id === "new"){
            setArticle(initialArticle);
        }
        else if(article.id !== Number(id)){
            getArticle(id);
        }
    }

    render(){
        const left = [
            <ArticleBreadcrumb key={1}/>,
            <ContentArea key={2}/>
        ];

        const right = [
            <CommentList key={1}/>,
            <CommentSender key={2}/>
        ];

        return (
            <Layout type={LAYOUT_JUSTIFY}
                    contentArea={left}
                    right={right}/>
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

const JustifyContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JustifyContent);

export default JustifyContentContainer