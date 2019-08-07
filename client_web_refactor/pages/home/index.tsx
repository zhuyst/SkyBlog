import {Col, Row} from "antd";
import React from "react";
import {listArticles} from "../../action/article/articles";
import {IThunkDispatch} from "../../action/common";
import {listCommits} from "../../action/github";
import {listMsg} from "../../action/msgBoard";
import {ARTICLE_PAGE_SIZE, MSG_PAGE_SIZE} from "../../action/pageSize";
import ArticleCard from "../../components/home/ArticleCard/ArticleCard";
import MsgBoardCard from "../../components/home/MsgBoardCard/MsgBoardCard";
import NavImage from "../../components/home/NavImage";
import Layout from "../../components/layout";
import {INextPage} from "../_app";

import "./index.less";

const Home: INextPage = () => (
    <Layout>
        <NavImage />
        <Row className="home-cards">
            <Col sm={24} md={{span: 8, offset: 2}}>
                <ArticleCard/>
            </Col>
            <Col md={6} sm={24}>
                <MsgBoardCard/>
            </Col>
            <Col md={6} sm={24}>
                2
            </Col>
        </Row>
    </Layout>
);

Home.getInitialProps = async ({ store }) => {
    const dispatch: IThunkDispatch = store.dispatch;
    await Promise.all([
        dispatch(listArticles(1, ARTICLE_PAGE_SIZE)),
        dispatch(listMsg(1, MSG_PAGE_SIZE)),
        dispatch(listCommits(1)),
    ]);
    return {};
};

export default Home;
