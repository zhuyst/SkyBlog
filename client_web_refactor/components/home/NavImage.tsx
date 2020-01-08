import React from "react";
import { Button } from "react-bootstrap";

import "./NavImage.scss";

const button = (size, text) => (
  (
    <Button
      size={size}
      variant="outline-secondary"
      className="nav-image-btn"
    >
      {text}
    </Button>
  )
);

const buttons = (size) => (
  <>
    {button(size, "查看SkyBlog源码")}
    {button(size, "查看作者Github")}
  </>
);

export default () => (
  <div className="nav-image">
    <img src="/static/images/home.jpg" alt="" />
    <div className="nav-image-text">
      <h1>Sky&nbsp;Blog</h1>
      <div className="d-none d-md-block">
        <hr />
        <h3>一个将阅读与管理合一的轻量级博客</h3>
      </div>
    </div>
    <div className="nav-image-button-group">
      <div className="d-block d-sm-none">
        {buttons("sm")}
      </div>
      <div className="d-none d-sm-block">
        {buttons("lg")}
      </div>
    </div>
  </div>
);
