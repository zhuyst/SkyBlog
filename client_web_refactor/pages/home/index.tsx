import {Col, Row} from "antd";
import React from "react";
import {listArticles} from "../../action/article/articles";
import {listMsg} from "../../action/msgBoard";
import AppLayout from "../../components/AppLayout";
import ArticleCard from "../../components/home/ArticleCard/ArticleCard";
import GithubCard from "../../components/home/GithubCard/GithubCard";
import MsgBoardCard from "../../components/home/MsgBoardCard/MsgBoardCard";
import NavImage from "../../components/home/NavImage";
import {IThunkDispatch} from "../../store";
import {INextPage} from "../_app";

import "./index.less";

const Home: INextPage = () => (
    <AppLayout>
        <NavImage />
        <Row className="home-cards">
            <Col sm={24} md={{span: 8, offset: 2}}>
                <ArticleCard/>
            </Col>
            <Col md={6} sm={24}>
                <MsgBoardCard/>
            </Col>
            <Col md={6} sm={24}>
                <GithubCard />
            </Col>
        </Row>
    </AppLayout>
);

Home.getInitialProps = async ({ store }) => {
    const dispatch: IThunkDispatch = store.dispatch;
    await Promise.all([
        dispatch(listArticles(1)),
        dispatch(listMsg(1)),
    ]);
    return {};
};

export default Home;
