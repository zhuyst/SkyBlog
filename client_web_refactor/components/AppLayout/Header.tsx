import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { IBaseProps } from "@/components/interfaces";

enum NavType {
  HOME = "/",
  BLOG = "/blog",
  MSG_BOARD = "/msgboard",
  ABOUT = "/about"
}

function getNavTypeByPathname(pathname: string): NavType {
  if (pathname.startsWith(NavType.BLOG)) {
    return NavType.BLOG;
  }
  if (pathname.startsWith(NavType.MSG_BOARD)) {
    return NavType.MSG_BOARD;
  }
  if (pathname.startsWith(NavType.ABOUT)) {
    return NavType.ABOUT;
  }

  return NavType.HOME;
}

export default (props: IBaseProps) => {
  const router = useRouter();
  const [currentNavType, setCurrentNavType] = useState(getNavTypeByPathname(router.pathname));
  useEffect(() => {
    const handleStart = (url: string) => {
      if (url === router.pathname) {
        return;
      }
      setCurrentNavType(getNavTypeByPathname(url));
    };
    router.events.on("routeChangeStart", handleStart);
    return () => {
      router.events.off("routeChangeStart", handleStart);
    };
  }, [router.pathname]);

  return (
    <header className={props.className}>
      {/* <div className="logo" /> */}
      <Navbar
        bg="light"
        expand="sm"
        className="app-layout-menu"
      >
        <Link href={NavType.HOME}>
          <Navbar.Brand>SkyBlog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <nav>
            <Nav as="ul" variant="pills" activeKey={currentNavType}>
              <Link href={NavType.HOME}>
                <Nav.Link as="li" eventKey={NavType.HOME}>首页</Nav.Link>
              </Link>
              <Link href={NavType.BLOG}>
                <Nav.Link as="li" eventKey={NavType.BLOG}>博客文章</Nav.Link>
              </Link>
              <Link href={NavType.MSG_BOARD}>
                <Nav.Link as="li" eventKey={NavType.MSG_BOARD}>留言板</Nav.Link>
              </Link>
              <Link href={NavType.ABOUT}>
                <Nav.Link as="li" eventKey={NavType.ABOUT}>关于</Nav.Link>
              </Link>
            </Nav>
          </nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
