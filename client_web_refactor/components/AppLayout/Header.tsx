import React from "react";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";

interface IHeaderProps {
  className?: string;
}

export default (props: IHeaderProps) => (
  <header className={props.className}>
    {/* <div className="logo" /> */}
    <Navbar
      bg="light"
      expand="sm"
      className="app-layout-menu"
    >
      <Link href="/">
        <Navbar.Brand>SkyBlog</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav as="ul" variant="pills" activeKey={1}>
          <Link href="/">
            <Nav.Link as="li" eventKey={1}>首页</Nav.Link>
          </Link>
          <Link href="/blog">
            <Nav.Link as="li" eventKey={2}>博客文章</Nav.Link>
          </Link>
          <Link href="/msgboard">
            <Nav.Link as="li" eventKey={3}>留言板</Nav.Link>
          </Link>
          <Link href="/about">
            <Nav.Link as="li" eventKey={4}>关于</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);
