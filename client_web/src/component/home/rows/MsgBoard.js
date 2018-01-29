import React from 'react'
import { Panel } from 'react-bootstrap'

class MsgBoard extends React.Component{
    render(){
        const title = (
            <h3>留言板</h3>
        );

        return(
            <Panel header={title} bsStyle="primary">
                这里是内容
            </Panel>
        )
    }
}

export default MsgBoard