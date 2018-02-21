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

class JustifyContent extends React.Component{
    componentWillMount(){
        const id = this.props.match.params.id;
        if(id === "new"){
            this.props.setArticle(initialArticle);
        }
        else {
            this.props.getArticle(id);
        }
    }

    render(){
        const right = (
            <div>
                <CommentList/>
                <CommentSender/>
            </div>
        );

        return (
            <Layout type={LAYOUT_JUSTIFY}
                    contentArea={<ContentArea/>}
                    right={right}/>
        )
    }
}

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
    null,
    mapDispatchToProps
)(JustifyContent);

export default JustifyContentContainer