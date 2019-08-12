import { Layout, Menu } from "antd";
import Link from "next/link";
import React from "react";
const { Header, Content, Footer } = Layout;

import "./index.less";

export default (props) => (
    <Layout className="app-layout">
        <Header className="app-layout-header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                className="app-layout-menu"
            >
                <Menu.Item key="1">
                    <Link href="/home">
                        <a>首页</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/blog">
                        <a>博客文章</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link href="/msgboard">
                        <a>留言板</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link href="/about">
                        <a>关于</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
        <Content className="app-layout-content">
            {props.children}
        </Content>
        <Footer className="app-layout-footer">
            Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>
);
