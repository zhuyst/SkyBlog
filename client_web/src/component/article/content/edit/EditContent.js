import React from 'react'
import ReactMarkdown from 'react-markdown'
import {connect} from "react-redux";

import ArticleEditor from "./ArticleEditor";
import ArticleTitle from "../ArticleTitle";
import Layout, {LAYOUT_JUSTIFY} from "../Layout";

import {initialArticle} from "../../../../reducer/article/ContentReducer";
import {getArticleInfo} from "../../../../action/article/ContentAction";
import {setArticle} from "../../../../action/article/ContentAction";

class EditContent extends React.Component{
    componentWillMount(){
        const {setArticle,getArticle,article} = this.props;
        let action;

        const id = this.props.match.params.id;
        if(id === "new"){
            const article = {
                ...initialArticle,
                content : initialArticle.content.text
            };
            setArticle(article);
            action = "发布"
        }
        else if(article.id !== Number(id)){
            getArticle(id);
            action = "修改"
        }

        document.title = `${action} - ${this.props.article.title} - 博客文章 - 青云的小窝`;
    }

    componentDidMount(){
        // 获取左侧编辑器高度，设置在右侧显示框中
        const left = document.getElementById("left");
        const right = document.getElementById("right");
        right.style.height = left.offsetHeight + "px";
    }

    render(){
        const article = this.props.article;

        const contentArea = (
            <ArticleEditor/>
        );
        const right = (
            <div className="content_main edit_content">
                <ArticleTitle editing={true}/>
                <ReactMarkdown source={article.content.text}/>
            </div>
        );

        return (
            <Layout type={LAYOUT_JUSTIFY}
                    contentArea={contentArea}
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
            dispatch(setArticle(article));
        }
    }
};

const EditContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContent);

export default EditContentContainer