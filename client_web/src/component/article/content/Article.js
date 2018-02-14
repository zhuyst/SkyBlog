import React from 'react'
import {Breadcrumb, Col, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class Article extends React.Component{
    render(){
        const {article,contentArea,right} = this.props;
        const title = article.title;

        return (
            <Row>
                <Col mdOffset={1} md={5}>
                    <Breadcrumb>
                        <LinkContainer to="/article">
                            <Breadcrumb.Item>
                                博客文章
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <LinkContainer to="#">
                            <Breadcrumb.Item>
                                分类
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>
                            {title}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {contentArea}
                </Col>
                <Col md={5}>
                    {right}
                </Col>
            </Row>
        )
    }
}

export default Article