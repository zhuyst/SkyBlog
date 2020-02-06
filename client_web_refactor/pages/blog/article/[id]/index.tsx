import Link from "next/link";
import React, { useState } from "react";
import {
  Breadcrumb, Card, Col, Container, Row,
} from "react-bootstrap";
import { getArticleInfo, setArticle } from "@/action-creator/article/article";
import { IArticle } from "@/define/article";
import ArticleHeader from "@/components/blog/content/ArticleHeader";
import MarkdownViewer from "@/components/blog/content/MarkdownViewer";
import Head from "@/components/common/Head";
import { LayoutType } from "@/define/common";
import { INextPage } from "@/pages/_app";
import { initialState } from "@/reducer/article/article";
import { useStoreSelector } from "@/store";

import "@/pages/blog/index.scss";
import "./index.scss";

interface IArticlePageProps {
  layout: LayoutType;
}

const ArticlePage: INextPage<IArticlePageProps> = (props) => {
  const article = useStoreSelector<IArticle>((state) => state.article);
  const {
    title, classify, content,
  } = article;

  const [currentLayout, setCurrentLayout] = useState(props.layout);
  return (
    <>
      <Head title="Article" />
      <Container className="blog-main" fluid>
        <Row>
          <Col
            md={12}
            lg={{
              span: currentLayout === LayoutType.FULL ? 8 : 6,
              offset: currentLayout === LayoutType.FULL ? 2 : 0,
            }}
          >
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
                <ArticleHeader
                  layout={currentLayout}
                  setCurrentLayout={setCurrentLayout}
                />
                <Card.Text className="article-content">
                  <MarkdownViewer text={content || ""} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={currentLayout === LayoutType.FULL ? 12 : 6}>
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
  const { article } = store.getState();

  if (id === "new") {
    await dispatch(setArticle(initialState));
  } else if (article.id !== Number(id)) {
    await dispatch(getArticleInfo(Number(id)));
  }

  return {
    layout: layout === LayoutType.JUSTIFY
      ? LayoutType.JUSTIFY
      : LayoutType.FULL,
  };
};

export default ArticlePage;
