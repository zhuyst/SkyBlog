import React from 'react'
import {Col, Row} from "react-bootstrap";

import MsgList from "./MsgList";
import MsgSender from './MsgSender'

import '../../static/css/msgboard/msgboard.css'

class Index extends React.Component{
    componentWillMount(){
        document.title = "留言板 - 青云的小窝";
    }

    render(){
        return (
            <Row className="msg_board_main">
                <Col mdOffset={1} md={6}>
                    <MsgList/>
                </Col>
                <Col md={4}>
                    <MsgSender/>
                </Col>
            </Row>
        )
    }
}

export default Index