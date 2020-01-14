import Link from "next/link";
import React from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import { useStoreSelector } from "@/store";
import Well from "@/components/common/Well";

import "./Navigation.scss";

export default () => {
  const management = useStoreSelector<boolean>((state) => state.login.management);
  const total = useStoreSelector<number>((state) => state.articles.page.total);

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
        <Link href="/">
          <ListGroup.Item>
            所有文章
            <Badge>{total}</Badge>
          </ListGroup.Item>
        </Link>
      </ListGroup>
    </Well>
  );
};
