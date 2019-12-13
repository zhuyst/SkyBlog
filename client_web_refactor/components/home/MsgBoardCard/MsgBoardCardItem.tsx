import React from "react";
import {IMsg} from "../../../api/msgBoard";
import {convertBr} from "../../../util";

import "./MsgBoardCardItem.scss";

interface IMsgBoardCardItemProps {
    msg: IMsg;
}

export default (props: IMsgBoardCardItemProps) => {
    const { msg } = props;

    return (
        <div className="msg-board-card-item">
            <div className="msg-board-card-item-content">
                <span dangerouslySetInnerHTML={{ __html : convertBr(msg.content) }}/>
            </div>
        </div>
    );
};
