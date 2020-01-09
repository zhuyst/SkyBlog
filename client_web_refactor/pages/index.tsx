import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { listArticles } from "@/action/article/articles";
import { listMsg } from "@/action/msgBoard";
import Head from "@/components/common/Head";
import ArticleCard from "@/components/home/ArticleCard/ArticleCard";
import GithubCard from "@/components/home/GithubCard/GithubCard";
import MsgBoardCard from "@/components/home/MsgBoardCard/MsgBoardCard";
import NavImage from "@/components/home/NavImage";
import { INextPage } from "./_app";

import "./index.scss";

const Home: INextPage = () => (
  <>
    <Head title="Home" />
    <NavImage />
    <Container fluid>
      <Row className="home-cards">
        <Col lg={{ span: 4, offset: 1 }} md={12}>
          <ArticleCard />
        </Col>
        <Col lg={3} md={12}>
          <MsgBoardCard />
        </Col>
        <Col lg={3} md={12}>
          <GithubCard />
        </Col>
      </Row>
    </Container>
  </>
);

Home.getInitialProps = async ({ store }) => {
  const { dispatch } = store;
  await Promise.all([
    dispatch(listArticles(1)),
    dispatch(listMsg(1)),
  ]);
  return {};
};

export default Home;
