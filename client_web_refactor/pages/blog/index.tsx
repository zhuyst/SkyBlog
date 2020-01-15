import {
  Container, Row, Col, Alert, Button,
} from "react-bootstrap";
import React from "react";
import Link from "next/link";
import { IClassifyWithArticlesState } from "@/reducer/article/articles";
import { listClassify } from "@/action/article/classify";
import Navigation from "@/components/blog/list/Navigation";
import Head from "@/components/common/Head";
import { listArticles, listArticlesByClassify } from "@/action/article/articles";
import { IPageInfo } from "@/action/common";
import { IArticle } from "@/api/article";
import ArticleList from "@/components/blog/list/ArticleList";
import { useStoreSelector } from "@/store";
import { INextPage } from "../_app";

import "./index.scss";

interface IBlogProps {
  classifyId?: number;
}

const Blog: INextPage<IBlogProps> = (props) => {
  let page: IPageInfo<IArticle>;
  let loading: boolean;
  let classify: IClassifyWithArticlesState | null;

  page = useStoreSelector<IPageInfo<IArticle>>((state) => state.articles.page);
  loading = useStoreSelector<boolean>((state) => state.articles.loading);
  classify = useStoreSelector<IClassifyWithArticlesState>(
    (state) => state.articles.classify,
  );

  if (!props.classifyId) {
    classify = null;
  } else {
    page = classify.page;
    loading = classify.loading;
  }

  return (
    <>
      <Head title="Blog" />
      <Container className="blog-main" fluid>
        <Row>
          <Col lg={{ span: 7, offset: 1 }} md={12}>
            {
              classify && (
              <Alert variant="info">
                <p>
                  <span>您正在查看文章分类&nbsp;-&nbsp;</span>
                  <strong>{classify.name}</strong>
                  <span>&nbsp;下的文章。</span>
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Link href="/blog">
                    <Button variant="outline-info" size="sm">
                      查看全部文章
                    </Button>
                  </Link>
                </div>
              </Alert>
              )
            }
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

Blog.getInitialProps = async ({ store, query }) => {
  const { dispatch } = store;
  const { classifyId } = query;
  const promises = [
    dispatch(listArticles(1)),
    dispatch(listClassify()),
  ];
  if (classifyId) {
    promises.push(dispatch(listArticlesByClassify(Number(classifyId), 1)));
  }
  await Promise.all(promises);

  return {
    classifyId: Number(classifyId),
  };
};

export default Blog;
