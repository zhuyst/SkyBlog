import {useRouter} from "next/router";
import React from "react";
import {useDispatch} from "react-redux";
import {setArticle} from "../../../action/article/article";
import {IArticle} from "../../../api/article";

import "./ArticleCardItem.less";

interface IArticleCardItemProps {
    article: IArticle;
}

export default (props: IArticleCardItemProps) => {
    const { article } = props;

    const dispatch = useDispatch();
    const router = useRouter();
    const push = async () => {
        dispatch(setArticle(article));
        await router.push(`/article/content/${article.id}/full`);
    };

    return (
        <div className="article-card-item" onClick={push}>
            <a>
                <h4 className="article-card-item-title">{article.title}</h4>
                <hr/>
                <p className="article-card-item-content">{article.content}</p>
                <p className="article-card-item-date">发布时间 : {article.createDate}</p>
            </a>
        </div>
    );
};
