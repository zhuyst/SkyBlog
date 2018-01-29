import React from 'react'
import {Badge, Pager, Panel} from "react-bootstrap";

import Msg from './Msg'

class MsgList extends React.Component{
    render(){
        const header = (
            <span>留言列表  <Badge>42</Badge></span>
        );

        return (
            <Panel header={header}>
                <Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/>
                <Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg/><Msg isLast={true}/>
                <Pager>
                    <Pager.Item previous disabled href="#">&larr; 上一页</Pager.Item>
                    <Pager.Item next disabled href="#">下一页 &rarr;</Pager.Item>
                </Pager>
            </Panel>
        )
    }
}

export default MsgList