import Link from "next/link";
import React from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import { IClassify } from "@/api/classify";
import { useStoreSelector } from "@/store";
import Well from "@/components/common/Well";

import "./Navigation.scss";

const ClassifyListGroup = (classify: IClassify) => (
  <ListGroup key={classify.id}>
    <Link href={`/blog?classifyId=${classify.id}`}>
      <ListGroup.Item active action>
        <span>{classify.name}</span>
        <Badge variant="light">
          {classify && classify.articles && classify.articles.length}
        </Badge>
      </ListGroup.Item>
    </Link>
    {
      classify && classify.articles
      && classify.articles.map((article) => (
        <Link href={`/blog/article/${article.id}`} key={article.id}>
          <ListGroup.Item action>{article.title}</ListGroup.Item>
        </Link>
      ))
    }
  </ListGroup>
);

export default () => {
  const management = useStoreSelector<boolean>((state) => state.login.management);
  const total = useStoreSelector<number>((state) => state.articles.page.total);
  const classify = useStoreSelector((state) => state.classify);

  return (
    <Well className="blog-navigation">
      <div className="navigation-title">
        <h2>博客分类</h2>
      </div>
      {
        management
        && (
          <Link href="/">
            <Button>发布文章</Button>
          </Link>
        )
      }
      <ListGroup>
        <Link href="/blog">
          <ListGroup.Item active action>
            <span>所有文章</span>
            <Badge variant="light">{total}</Badge>
          </ListGroup.Item>
        </Link>
      </ListGroup>
      {classify.list.map((c) => ClassifyListGroup(c))}
    </Well>
  );
};
