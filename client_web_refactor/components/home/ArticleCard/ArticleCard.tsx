import React from "react";
import { Badge, Card } from "react-bootstrap";
import List from "@/components/common/List";
import { IPageInfo } from "@/action/common";
import { IArticle } from "@/api/article";
import { useStoreSelector } from "@/store";
import ArticleCardItem from "./ArticleCardItem";

import "./ArticleCard.scss";

const MAX_LENGTH = 3;

export default () => {
  const page = useStoreSelector<IPageInfo<IArticle>>((state) => state.articles.page);
  const loading = useStoreSelector<boolean>((state) => state.articles.loading);
  const { total, list } = page;

  const renderItem = (article: IArticle) => <ArticleCardItem article={article} />;
  return (
    <Card className="article-card">
      <Card.Header>
        <span>最近更新的文章</span>
        <Badge variant="light">{total}</Badge>
      </Card.Header>
      <Card.Body>
        <List
          dataSource={list.slice(0, MAX_LENGTH)}
          renderItem={renderItem}
          loading={loading}
        />
      </Card.Body>
    </Card>
  );
};
