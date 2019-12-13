import Link from "next/link";
import React from "react";
import {Nav, Navbar} from "react-bootstrap";

import "./index.scss";

export default (props) => (
    <div className="app-layout">
        <div className="app-layout-header">
            <div className="logo" />
            <Navbar
                bg="light"
                className="app-layout-menu"
            >
                <Link href="/home">
                    <Navbar.Brand>SkyBlog</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link>
                            <Link href="/home">首页</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href="/blog">博客文章</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href="/msgboard">留言板</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link href="/about">关于</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        <div className="app-layout-content">
            {props.children}
        </div>
        <div className="app-layout-footer">
            Ant Design ©2018 Created by Ant UED
        </div>
    </div>
);
