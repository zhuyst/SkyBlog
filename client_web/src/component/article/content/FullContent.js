import React from 'react'
import {connect} from "react-redux";

import ContentArea from "./ContentArea";
import CommentList from "./comment/CommentList";
import CommentSender from "./comment/CommentSender";
import Layout, {LAYOUT_FULL} from "./Layout";

import {initialArticle} from "../../../reducer/article/ContentReducer";

import {getArticleInfo} from "../../../action/article/ContentAction";
import {listComments, setArticle} from "../../../action/article/ContentAction";
import ArticleBreadcrumb from "./ArticleBreadcrumb";
import {Panel} from "react-bootstrap";
import {COMMENT_PAGE_SIZE} from "../../../Constant";
import ContentLoading from "./ContentLoading";

class FullContent extends React.Component{
    componentWillMount(){
        const {setArticle,getArticle,listComments,article} = this.props;
        const id = this.props.match.params.id;

        if(id === "new"){
            setArticle(initialArticle);
        }
        else if(article.id !== Number(id)){
            getArticle(id);
        }
        else {
            listComments(id,1)
        }
    }

    render(){
        let content;
        if(this.props.loading){
            content = (
                <ContentLoading/>
            )
        }
        else {
            content = (
                <div className="full_content">
                    <ContentArea/>
                </div>
            )
        }

        const contentArea = (
            <div>
                <ArticleBreadcrumb/>
                <Panel>
                    <Panel.Body>
                        {content}
                    </Panel.Body>
                </Panel>
                <CommentList/>
                <CommentSender/>
            </div>
        );

        return (
            <Layout type={LAYOUT_FULL}
                    contentArea={contentArea}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        article : state.content.article,
        loading : state.content.article_loading
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
        listComments : (id,pageNum) => {
            dispatch(listComments(id,pageNum,COMMENT_PAGE_SIZE));
        }
    }
};

const FullContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FullContent);

export default FullContentContainer