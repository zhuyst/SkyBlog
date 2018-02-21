import React from 'react'
import {Col, Row} from "react-bootstrap";
import ArticleBreadcrumb from "../ArticleBreadcrumb";

class FullLayout extends React.Component{
    render(){
        const {article,contentArea} = this.props;

        return (
            <div>
                <Row>
                    <Col mdOffset={3} md={6}>
                        <ArticleBreadcrumb article={article}/>
                        {contentArea}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FullLayout