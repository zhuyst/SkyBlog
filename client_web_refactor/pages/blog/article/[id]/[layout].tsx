import {
  Container, Row, Col, Breadcrumb, Card,
} from "react-bootstrap";
import React from "react";
import Link from "next/link";
import { initialState } from "@/reducer/article/article";
import { IArticle } from "@/api/article";
import MarkdownViewer from "@/components/common/MarkdownViewer";
import { useStoreSelector } from "@/store";
import { getArticleInfo, setArticle } from "@/action/article/article";
import Head from "@/components/common/Head";
import { INextPage } from "@/pages/_app";

import "./[layout].scss";

enum LayoutType {
  FULL = "full",
  JUSTIFY = "justify"
}

interface IArticlePageProps {
  layout: LayoutType;
}

const ArticlePage: INextPage<IArticlePageProps> = (props) => {
  const article = useStoreSelector<IArticle>((state) => state.article);
  const {
    title, subTitle, classify, content,
  } = article;
  const lg = props.layout === LayoutType.FULL ? 12 : 6;
  return (
    <>
      <Head title="Article" />
      <Container className="blog-main" fluid>
        <Row>
          <Col md={12} lg={lg}>
            <Breadcrumb>
              <Link href="/">
                <Breadcrumb.Item>
                  博客文章
                </Breadcrumb.Item>
              </Link>
              <Link href="/">
                <Breadcrumb.Item>
                  {classify ? classify.name : "未分类"}
                </Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item active>
                {title}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Card className="blog-article">
              <Card.Body>
                <div className="article-header">
                  <Card.Title>
                    <h1>{title}</h1>
                  </Card.Title>
                  <Card.Subtitle>
                    <h3 className="mb-2 text-muted">{subTitle}</h3>
                  </Card.Subtitle>
                </div>
                <Card.Text className="article-content">
                  <MarkdownViewer text={content || ""} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={lg}>
            <div />
          </Col>
        </Row>
      </Container>
    </>
  );
};

ArticlePage.getInitialProps = async ({ store, query }) => {
  const { dispatch } = store;
  const { id, layout } = query;

  if (id === "new") {
    await dispatch(setArticle(initialState));
  } else {
    await dispatch(getArticleInfo(Number(id)));
  }

  return {
    layout: layout === LayoutType.JUSTIFY
      ? LayoutType.JUSTIFY
      : LayoutType.FULL,
  };
};

export default ArticlePage;
