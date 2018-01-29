import React from 'react'
import { Row,Col } from 'react-bootstrap'

import Article from './Article'
import MsgBoard from './MsgBoard'

import '../../../static/css/home/rows.css'

class Rows extends React.Component{
    render(){
        return (
            <Row className="rows">
                <Col md={5} mdOffset={2} sm={12}>
                    <div>
                        <Article/>
                    </div>
                </Col>
                <Col md={3} sm={12}>
                    <div>
                        <MsgBoard/>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default Rows