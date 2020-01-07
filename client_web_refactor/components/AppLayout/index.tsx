import Link from "next/link";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import "./index.scss";

export default (props) => (
  <div className="app-layout">
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
    <header className="app-layout-header">
      {/* <div className="logo" /> */}
      <Navbar
        bg="light"
        expand="sm"
        className="app-layout-menu"
      >
        <Link href="/home">
          <Navbar.Brand>SkyBlog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link href="/home">
              <Nav.Link>首页</Nav.Link>
            </Link>
            <Link href="/blog">
              <Nav.Link>博客文章</Nav.Link>
            </Link>
            <Link href="/msgboard">
              <Nav.Link>留言板</Nav.Link>
            </Link>
            <Link href="/about">
              <Nav.Link>关于</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
    <div className="app-layout-content">
      {props.children}
    </div>
    <footer className="app-layout-footer">
            Ant Design ©2018 Created by Ant UED
    </footer>
  </div>
);
