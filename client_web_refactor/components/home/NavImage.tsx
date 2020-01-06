import React from "react";
import {
  Button, Col, Container, Row,
} from "react-bootstrap";

import "./NavImage.scss";

export default () => {
  const buttons = (size) => [
    (<Button size={size} variant="outline-primary">查看SkyBlog源码</Button>),
    (<Button size={size} variant="outline-primary">查看作者Github</Button>),
  ];

  return (
    <div className="nav-image">
      <img src="/static/images/home.jpg" />
      <Container className="nav-image-container">
        <Row className="nav-image-text">
          <h1>Sky&nbsp;Blog</h1>
          <Col xs={0} sm={12}>
            <hr />
            <h3>一个将阅读与管理合一的轻量级博客</h3>
          </Col>
        </Row>
        <Row className="nav-image-button-group">
          <Col xs={0} sm={12}>
            {buttons("sm")}
          </Col>
          <Col xs={12} sm={0}>
            {buttons("lg")}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
