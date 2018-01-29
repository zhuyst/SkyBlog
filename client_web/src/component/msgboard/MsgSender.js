import React from 'react'
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class MsgSender extends React.Component{
    render(){
        return (
            <div>
                <FormGroup controlId="msg">
                    <ControlLabel>发表留言</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="请输入留言......"
                                 style={{height : '100px'}}
                    />
                </FormGroup>

                <Button bsStyle="primary" bsSize="large" block>发表留言</Button>
            </div>
        )
    }
}

export default MsgSender