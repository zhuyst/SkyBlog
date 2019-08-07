import { Badge, Card } from "antd";
import React from "react";
import {useStoreSelector} from "../../../store";
import "./ArticleCard.less";
import ArticleCardPreview from "./ArticleCardPreview";

const MAX_LENGTH = 3;

export default () => {
    const page = useStoreSelector((state) => state.articles.page);
    const { total, list } = page;

    const title = (
        <span>
            最近更新的文章&nbsp;&nbsp;<Badge count={total}/>
        </span>
    );

    const content = list.slice(0, MAX_LENGTH).map((article) => (
        <ArticleCardPreview article={article} key={article.id}/>
    ));

    return (
        <Card className="article-card" title={title}>
            {content}
        </Card>
    );
};
