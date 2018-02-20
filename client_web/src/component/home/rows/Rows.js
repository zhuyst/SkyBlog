import React from 'react'
import { Row,Col} from 'react-bootstrap'

import Article from './Article'
import MsgBoard from './MsgBoard'

import '../../../static/css/home/rows.css'

class Rows extends React.Component{
    render(){
        return (
            <Row className="rows">
                <Col md={6} mdOffset={1} sm={12}>
                    <Article/>
                </Col>
                <Col md={4} sm={12}>
                    <MsgBoard/>
                </Col>
            </Row>
        )
    }
}

export default Rows