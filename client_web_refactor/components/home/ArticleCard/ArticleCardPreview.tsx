import React from "react";
import {IArticle} from "../../../api/article";
import "./ArticleCardPreview.less";

interface IArticleCardPreviewProps {
    article: IArticle;
}

export default (props: IArticleCardPreviewProps) => {
    const { article } = props;

    return (
        <div className="article-card-preview">
            <a>
                <h4 className="article-card-preview-title">{article.title}</h4>
                <hr/>
                <p className="article-card-preview-content">{article.content}</p>
                <p className="article-card-preview-date">发布时间 : {article.createDate}</p>
            </a>
        </div>
    );
};
