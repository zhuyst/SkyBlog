import React from "react";
import MsgItem from "@/components/msgboard/MsgItem";
import { IPageInfo } from "@/action/common";
import { IMsg } from "@/api/msgBoard";
import List from "@/components/common/List";

import "./MsgList.scss";

interface IMsgListProps {
  page: IPageInfo<IMsg>;
  loading: boolean;
}

export default (props: IMsgListProps) => {
  const renderItem = (msg: IMsg) => (<MsgItem msg={msg} />);
  return (
    <div className="msg-list">
      <List
        dataSource={props.page.list}
        renderItem={renderItem}
        loading={props.loading}
      />
    </div>
  );
};
