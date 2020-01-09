import { Card, Accordion } from "react-bootstrap";
import React from "react";
import { IArticle } from "@/api/article";

import "./ArticleListItem.scss";

interface IArticleListItemProps {
  article: IArticle;
}

export default (props: IArticleListItemProps) => {
  const { article } = props;

  const articleIdStr = article.id.toString();
  return (
    <Accordion defaultActiveKey={articleIdStr}>
      <Card className="article-list-item">
        <Accordion.Toggle eventKey={articleIdStr} as={Card.Header}>
          {article.title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={articleIdStr}>
          <Card.Body>
            <h3 className="article-list-item-title">{article.title}</h3>
            <p className="article-list-item-sub-title">{article.subTitle}</p>
            <p className="article-list-item-content">{article.content}</p>
            <p className="article-list-item-date">
              发布时间 :
              {article.createDate}
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
