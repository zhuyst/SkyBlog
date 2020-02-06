import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import { listMsg } from "@/action-creator/msgBoard";
import MsgList from "@/components/msgboard/MsgList";
import { IPageInfo } from "@/define/common";
import { IMsg } from "@/define/msgBoard";
import Head from "@/components/common/Head";
import { useStoreSelector } from "@/store";
import { INextPage } from "@/pages/_app";

import "./index.scss";

const MsgBoard: INextPage = () => {
  const page = useStoreSelector<IPageInfo<IMsg>>((state) => state.msgBoard.page);
  const loading = useStoreSelector<boolean>((state) => state.msgBoard.loading);
  return (
    <>
      <Head title="MsgBoard" />
      <Container className="msg-board-main" fluid>
        <Row>
          <Col>
            <MsgList page={page} loading={loading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

MsgBoard.getInitialProps = async ({ store }) => {
  const { dispatch } = store;
  await Promise.all([
    dispatch(listMsg(1)),
  ]);
  return {};
};

export default MsgBoard;
