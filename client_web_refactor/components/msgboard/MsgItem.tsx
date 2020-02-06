import React from "react";
import { IMsg } from "@/define/msgBoard";

import "./MsgItem.scss";

interface IMsgItemProps {
  msg: IMsg;
}

export default (props: IMsgItemProps) => (
  <div className="msg-item">
    {props.msg.content}
  </div>
);
