import React from 'react'
import {Col, Row} from "react-bootstrap";
import ArticleBreadcrumb from "./ArticleBreadcrumb";

class FullLayout extends React.Component{
    render(){
        const {article,contentArea} = this.props;

        return (
            <Row>
                <Col mdOffset={2} md={8}>
                    <ArticleBreadcrumb article={article}/>
                    {contentArea}
                </Col>
            </Row>
        )
    }
}

export default FullLayout