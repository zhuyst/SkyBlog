import { Card, Accordion, Badge } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import { IArticle } from "@/define/article";

import "./ArticleListItem.scss";

interface IArticleListItemProps {
  article: IArticle;
}

export default (props: IArticleListItemProps) => {
  const { article } = props;
  const {
    id, title, subTitle, content, classify, createDate,
  } = article;

  const articleIdStr = id.toString();
  return (
    <Accordion defaultActiveKey={articleIdStr}>
      <Card className="article-list-item">
        <Accordion.Toggle eventKey={articleIdStr} as={Card.Header}>
          <span className="article-list-item-header">{title}</span>
          <Badge variant="light">{classify ? classify.name : "未分类"}</Badge>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={articleIdStr}>
          <Link href={`/blog/article/${articleIdStr}`}>
            <Card.Body>
              <h3 className="article-list-item-title">{title}</h3>
              <div className="article-list-item-sub-title">{subTitle}</div>
              <div className="article-list-item-content">{content}</div>
              <div className="article-list-item-date">
                发布时间 :
                {createDate}
              </div>
            </Card.Body>
          </Link>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
