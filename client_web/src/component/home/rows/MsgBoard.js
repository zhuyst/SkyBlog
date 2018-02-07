import React from 'react'
import { Panel } from 'react-bootstrap'

class MsgBoard extends React.Component{
    render(){
        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">留言板</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    这里是内容
                </Panel.Body>
            </Panel>
        )
    }
}

export default MsgBoard