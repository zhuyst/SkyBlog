import React from "react";
import MsgItem from "@/components/msgboard/MsgItem";
import { IPageInfo } from "@/define/common";
import { IMsg } from "@/define/msgBoard";
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
