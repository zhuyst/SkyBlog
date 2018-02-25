import React from 'react'
import {Row, Col} from 'react-bootstrap'

import Article from './article/Article'
import MsgBoard from './msgboard/MsgBoard'

import '../../../static/css/home/rows.css'
import Github from "./github/Github";

class Rows extends React.Component{
    render(){
        return (
            <Row className="rows">
                <Col md={4} mdOffset={1} sm={12}>
                    <Article/>
                </Col>
                <Col md={3} sm={12}>
                    <MsgBoard/>
                </Col>
                <Col md={3} sm={12}>
                    <Github/>
                </Col>
            </Row>
        )
    }
}

export default Rows