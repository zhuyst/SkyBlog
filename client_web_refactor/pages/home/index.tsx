import React from "react";
import Layout from "../../components/layout";

import "./index.less";

export default () => (
    <Layout>
        <div className="nav-image">
            <img src="/static/images/home.jpg" />
            <div className="nav-image-container">
                <div className="nav_image_text">
                    <h1>Sky&nbsp;Blog</h1>
                    <div className="hidden-xs">
                        <hr/>
                        <h3>一个将阅读与管理合一的轻量级博客</h3>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);
