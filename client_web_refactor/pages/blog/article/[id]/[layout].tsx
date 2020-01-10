import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { IArticle } from "@/api/article";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { useStoreSelector } from "@/store";
import { getArticleInfo } from "@/action/article/article";
import Head from "@/components/common/Head";
import { INextPage } from "@/pages/_app";

enum LayoutType {
  FULL = "full",
  JUSTIFY = "justify"
}

interface IArticlePageProps {
  layout: LayoutType;
}

const ArticlePage: INextPage<IArticlePageProps> = (props) => {
  const article = useStoreSelector<IArticle>((state) => state.article);
  const lg = props.layout === LayoutType.FULL ? 12 : 6;
  return (
    <>
      <Head title="Article" />
      <Container fluid>
        <Row>
          <Col md={12} lg={lg}>
            <MarkdownViewer text={article.content || ""} />
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
  await dispatch(getArticleInfo(Number(id)));

  return {
    layout: layout === LayoutType.JUSTIFY ? LayoutType.JUSTIFY : LayoutType.FULL,
  };
};

export default ArticlePage;
