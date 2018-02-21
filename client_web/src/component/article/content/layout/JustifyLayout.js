import React from 'react'
import {Col, Row} from "react-bootstrap";
import ArticleBreadcrumb from "../ArticleBreadcrumb";

class JustifyLayout extends React.Component{
    render(){
        const {article,contentArea,right} = this.props;

        return (
            <div>
                <Row>
                    <Col mdOffset={1} md={5}>
                        <ArticleBreadcrumb article={article}/>
                        {contentArea}
                    </Col>
                    <Col md={5}>
                        {right}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default JustifyLayout