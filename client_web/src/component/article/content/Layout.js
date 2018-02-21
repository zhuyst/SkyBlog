import React from 'react'
import {Col, Row} from "react-bootstrap";
import ArticleBreadcrumb from "./ArticleBreadcrumb";

export const LAYOUT_JUSTIFY = "justify";
export const LAYOUT_FULL = "full";

class Layout extends React.Component{
    render(){
        const {article,contentArea,right,type} = this.props;

        const isJustify = (type === LAYOUT_JUSTIFY);
        const mdOffset = isJustify ? 1 : 3;
        const md = isJustify ? 5 : 6;

        return (
            <div>
                <Row>
                    <Col mdOffset={mdOffset} md={md}>
                        <ArticleBreadcrumb article={article}/>
                        {contentArea}
                    </Col>
                    {
                        isJustify &&
                        <Col md={5}>
                            {right}
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

export default Layout