import { Layout, Menu } from "antd";
import Link from "next/link";
import React from "react";
const { Header, Content, Footer } = Layout;

import "./index.scss";

export default (props) => (
    <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={{ lineHeight: "64px" }}
            >
                <Menu.Item key="1">
                    <Link href="/home">
                        首页
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/blog">
                        博客文章
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link href="/msgboard">
                        留言板
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link href="/about">
                        关于
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
);
