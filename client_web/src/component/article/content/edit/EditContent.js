import React from 'react'
import ReactMarkdown from 'react-markdown'
import {connect} from "react-redux";

import ArticleEditor from "./ArticleEditor";
import ArticleTitle from "../ArticleTitle";
import Layout, {LAYOUT_JUSTIFY} from "../Layout";

import {initialArticle} from "../../../../reducer/article/ContentReducer";
import {getArticleInfo} from "../../../../action/article/ContentAction";
import {setArticle} from "../../../../action/article/ContentAction";
import ArticleBreadcrumb from "../ArticleBreadcrumb";
import {FADE_ENTER} from "../../../../Constant";

class EditContent extends React.Component{
    componentWillMount(){
        const {setArticle,getArticle,article} = this.props;
        let action = "修改";

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
        }

        document.title = `${action} - ${this.props.article.title} - 博客文章 - 青云的小窝`;
    }

    componentDidMount(){
        this.init();
    }

    init = () => {
        setTimeout(() => {
            const main = document.getElementById("main");
            const mde_editor = document.getElementById("mde-editor");
            const all_editor = document.getElementById("all-editor");
            const left = document.getElementById("left");
            const right = document.getElementById("right");

            // 有可能会出现用户已经离开页面的情况
            const samePage = right != null && left != null;
            if(samePage){

                // 调整高度
                right.style.height = left.offsetHeight + "px";
                right.style.height = main.offsetHeight + "px";

                // 将剩余的高度设置给textArea
                const mdeHeight = mde_editor.offsetHeight + right.offsetHeight - all_editor.offsetHeight;
                mde_editor.style.height = mdeHeight + "px";
            }
        },FADE_ENTER)
    };

    render(){
        const article = this.props.article;

        const contentArea = (
            <div id="all-editor">
                <ArticleBreadcrumb/>,
                <ArticleEditor/>
            </div>
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