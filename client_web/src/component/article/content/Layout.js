import React from 'react'
import {Col, Grid, Row} from "react-bootstrap";

export const LAYOUT_JUSTIFY = "justify";
export const LAYOUT_FULL = "full";

class Layout extends React.Component{
    render(){
        const {contentArea,right,type} = this.props;

        const isJustify = (type === LAYOUT_JUSTIFY);
        const mdOffset = isJustify ? 0 : 2;
        const md = isJustify ? 6 : 8;

        return (
            <Grid fluid={true}>
                <Row>
                    <Col mdOffset={mdOffset} md={md} sm={12} id="left">
                        {contentArea}
                    </Col>
                    {
                        isJustify &&
                        <Col md={6} sm={12} id="right">
                            {right}
                        </Col>
                    }
                </Row>
            </Grid>
        )
    }
}

export default Layout