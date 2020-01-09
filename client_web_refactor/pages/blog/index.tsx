import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import Navigation from "@/components/blog/Navigation";
import Head from "@/components/common/Head";
import { listArticles } from "@/action/article/articles";
import { IPageInfo } from "@/action/common";
import { IArticle } from "@/api/article";
import ArticleList from "@/components/blog/ArticleList";
import { useStoreSelector } from "@/store";
import { INextPage } from "../_app";

import "./index.scss";

const Blog: INextPage = () => {
  const page = useStoreSelector<IPageInfo<IArticle>>((state) => state.articles.page);
  const loading = useStoreSelector<boolean>((state) => state.articles.loading);

  return (
    <>
      <Head title="Blog" />
      <Container className="blog-main" fluid>
        <Row>
          <Col lg={{ span: 7, offset: 1 }} md={12}>
            <ArticleList pageInfo={page} loading={loading} />
          </Col>
          <Col lg={3} md={12}>
            <Navigation />
          </Col>
        </Row>
      </Container>
    </>
  );
};

Blog.getInitialProps = async ({ store }) => {
  const { dispatch } = store;
  await dispatch(listArticles(1));
  return {};
};

export default Blog;
