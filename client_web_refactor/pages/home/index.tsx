import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {listArticles} from "../../action/article/articles";
import {listMsg} from "../../action/msgBoard";
import AppLayout from "../../components/AppLayout";
import ArticleCard from "../../components/home/ArticleCard/ArticleCard";
import GithubCard from "../../components/home/GithubCard/GithubCard";
import MsgBoardCard from "../../components/home/MsgBoardCard/MsgBoardCard";
import NavImage from "../../components/home/NavImage";
import {IThunkDispatch} from "../../store";
import {INextPage} from "../_app";

import "./index.scss";

const Home: INextPage = () => (
    <AppLayout>
        <NavImage />
        <Container>
            <Row className="home-cards">
                <Col sm={12} md={{span: 4, offset: 1}}>
                    <ArticleCard/>
                </Col>
                <Col md={3} sm={12}>
                    <MsgBoardCard/>
                </Col>
                <Col md={3} sm={12}>
                    <GithubCard />
                </Col>
            </Row>
        </Container>
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
