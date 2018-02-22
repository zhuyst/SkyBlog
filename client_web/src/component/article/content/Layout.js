import React from 'react'
import {Col, Row} from "react-bootstrap";
import ArticleBreadcrumb from "./ArticleBreadcrumb";

export const LAYOUT_JUSTIFY = "justify";
export const LAYOUT_FULL = "full";

class Layout extends React.Component{
    render(){
        const {contentArea,right,type} = this.props;

        const isJustify = (type === LAYOUT_JUSTIFY);
        const mdOffset = isJustify ? 1 : 2;
        const md = isJustify ? 5 : 8;

        return (
            <div>
                <Row>
                    <Col mdOffset={mdOffset} md={md} sm={12} id="left">
                        {contentArea}
                    </Col>
                    {
                        isJustify &&
                        <Col md={5} id="right">
                            {right}
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

export default Layout