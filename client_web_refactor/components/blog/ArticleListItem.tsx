import { Collapse } from "antd";
import React from "react";
import {IArticle} from "../../api/article";

import "./ArticleListItem.scss";

const { Panel } = Collapse;

interface IArticleListItemProps {
    article: IArticle;
}

export default (props: IArticleListItemProps) => {
    const { article } = props;

    const header = (
        <span>{article.title}</span>
    );

    const articleIdStr = article.id.toString();
    return (
        <Collapse defaultActiveKey={articleIdStr}>
            <Panel className="article-list-item" key={articleIdStr} header={header}>
                <div>
                    <h3 className="article-list-item-title">{article.title}</h3>
                    <p className="article-list-item-sub-title">{article.subTitle}</p>
                    <p className="article-list-item-content">{article.content}</p>
                    <p className="article-list-item-date">发布时间 : {article.createDate}</p>
                </div>
            </Panel>
        </Collapse>
    );
};
