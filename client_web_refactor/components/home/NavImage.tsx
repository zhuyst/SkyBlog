import { Button, Col, Row } from "antd";
import React from "react";

import "./NavImage.less";

export default () => (
    <div className="nav-image">
        <img src="/static/images/home.jpg" />
        <div className="nav-image-container">
            <Row className="nav-image-text">
                <h1>Sky&nbsp;Blog</h1>
                <Col xs={0} sm={24}>
                    <hr/>
                    <h3>一个将阅读与管理合一的轻量级博客</h3>
                </Col>
            </Row>
            <Row className="nav-image-button-group">
                <Col xs={0} sm={24}>
                    <Button size="large" ghost>查看SkyBlog源码</Button>
                    <Button size="large" ghost>查看作者Github</Button>
                </Col>
                <Col xs={24} sm={0}>
                    <Button size="small" ghost>查看SkyBlog源码</Button>
                    <Button size="small" ghost>查看作者Github</Button>
                </Col>
            </Row>
        </div>
    </div>
)
