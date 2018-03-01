import React from 'react'
import {connect} from "react-redux";

import ContentArea from "./ContentArea";
import CommentList from "./comment/CommentList";
import CommentSender from "./comment/CommentSender";
import Layout, {LAYOUT_FULL} from "./Layout";

import {initialArticle} from "../../../reducer/article/ContentReducer";

import {getArticleInfo} from "../../../action/article/ArticlesAction";
import {setArticle} from "../../../action/article/ContentAction";
import ArticleBreadcrumb from "./ArticleBreadcrumb";
import {Panel} from "react-bootstrap";

class FullContent extends React.Component{
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
        const contentArea = (
            <div>
                <ArticleBreadcrumb/>
                <Panel>
                    <Panel.Body>
                        <div className="full_content">
                            <ContentArea/>
                        </div>
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