import {Badge, Card, List} from "antd";
import React from "react";
import {IPageInfo} from "../../../action/common";
import {IArticle} from "../../../api/article";
import {useStoreSelector} from "../../../store";
import ArticleCardItem from "./ArticleCardItem";

import "./ArticleCard.less";

const MAX_LENGTH = 3;

export default () => {
    const page = useStoreSelector<IPageInfo<IArticle>>((state) => state.articles.page);
    const loading = useStoreSelector<boolean>((state) => state.articles.loading);
    const { total, list } = page;

    const title = (
        <span>
            最近更新的文章&nbsp;&nbsp;<Badge count={total}/>
        </span>
    );

    const renderItem = (article) => <ArticleCardItem article={article}/>;
    return (
        <Card className="article-card" title={title}>
            <List
                dataSource={list.slice(0, MAX_LENGTH)}
                renderItem={renderItem}
                loading={loading}
            />
        </Card>
    );
};
