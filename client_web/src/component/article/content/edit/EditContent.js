import React from 'react'
import ReactMarkdown from 'react-markdown'
import {connect} from "react-redux";

import ArticleEditor from "./ArticleEditor";
import ArticleTitle from "../ArticleTitle";
import Layout, {LAYOUT_JUSTIFY} from "../Layout";

import {initialArticle} from "../../../../reducer/article/ContentReducer";
import {deleteArticle, getArticleInfo} from "../../../../action/article/ArticlesAction";
import {setArticle} from "../../../../action/article/ContentAction";

class EditContent extends React.Component{
    componentWillMount(){
        let action;

        const id = this.props.match.params.id;
        if(id === "new"){
            this.props.setArticle(initialArticle);
            action = "发布"
        }
        else {
            this.props.getArticle(id);
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
            <ArticleEditor article={article} />
        );
        const right = (
            <div className="content_main edit_content">
                <ArticleTitle hasButton={false}/>
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
        },
        deleteArticle : id => {
            dispatch(deleteArticle(id))
        }
    }
};

const EditContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContent);

export default EditContentContainer