import React from "react";
import {Badge, Card, List} from "react-bootstrap";
import {IPageInfo} from "../../../action/common";
import {IMsg} from "../../../api/msgBoard";
import {useStoreSelector} from "../../../store";
import MsgBoardCardItem from "./MsgBoardCardItem";

import "./MsgBoardCard.scss";

const MAX_LENGTH = 5;

export default () => {
    const page = useStoreSelector<IPageInfo<IMsg>>((state) => state.msgBoard.page);
    const loading = useStoreSelector<boolean>((state) => state.msgBoard.loading);
    const { total, list } = page;

    const renderItem = (msg) => <MsgBoardCardItem msg={msg}/>;
    return (
        <Card className="msg-board-card">
            <Card.Title>
                留言板&nbsp;&nbsp;<Badge>{total}</Badge>
            </Card.Title>
            <List
                dataSource={list.slice(0, MAX_LENGTH)}
                renderItem={renderItem}
                loading={loading}
            />
        </Card>
    );
};
