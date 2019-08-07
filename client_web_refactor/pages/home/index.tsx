import {Col, Row} from "antd";
import React from "react";
import {listArticles} from "../../action/article/articles";
import {IThunkDispatch} from "../../action/common";
import {ARTICLE_PAGE_SIZE} from "../../action/pageSize";
import ArticleCard from "../../components/home/ArticleCard/ArticleCard";
import NavImage from "../../components/home/NavImage";
import Layout from "../../components/layout";
import {AppStore} from "../../store";
import "./index.less";

const Home = () => (
    <Layout>
        <NavImage />
        <Row className="home-cards">
            <Col sm={24} md={{span: 8, offset: 2}}>
                <ArticleCard/>
            </Col>
            <Col md={6} sm={24}>
                1
            </Col>
            <Col md={6} sm={24}>
                2
            </Col>
        </Row>
    </Layout>
);

Home.getInitialProps = async ({ store }: { store: AppStore }) => {
    const dispatch: IThunkDispatch = store.dispatch;
    dispatch(listArticles(1, ARTICLE_PAGE_SIZE));
    return {};
};

export default Home;
