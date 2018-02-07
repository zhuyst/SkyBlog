import React from 'react'
import {Badge, Pager, Panel} from 'react-bootstrap'

import Comment from './Comment'

class CommentList extends React.Component{
    render(){
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <span>评论列表  <Badge>42</Badge></span>
                </Panel.Heading>
                <Panel.Body>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment isLast={true}/>
                    <Pager>
                        <Pager.Item previous disabled href="#">&larr; 上一页</Pager.Item>
                        <Pager.Item next disabled href="#">下一页 &rarr;</Pager.Item>
                    </Pager>
                </Panel.Body>
            </Panel>
        )
    }
}

export default CommentList