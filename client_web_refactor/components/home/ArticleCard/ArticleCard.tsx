import React from "react";
import {Badge, Card, List} from "react-bootstrap";
import {IPageInfo} from "../../../action/common";
import {IArticle} from "../../../api/article";
import {useStoreSelector} from "../../../store";
import ArticleCardItem from "./ArticleCardItem";

import "./ArticleCard.scss";

const MAX_LENGTH = 3;

export default () => {
    const page = useStoreSelector<IPageInfo<IArticle>>((state) => state.articles.page);
    const loading = useStoreSelector<boolean>((state) => state.articles.loading);
    const { total, list } = page;

    const renderItem = (article) => <ArticleCardItem article={article}/>;
    return (
        <Card className="article-card">
            <Card.Title>
                最近更新的文章&nbsp;&nbsp;<Badge>{total}</Badge>
            </Card.Title>
            <List
                dataSource={list.slice(0, MAX_LENGTH)}
                renderItem={renderItem}
                loading={loading}
            />
        </Card>
    );
};
