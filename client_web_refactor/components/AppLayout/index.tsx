import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spinner, Fade } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";

import "./index.scss";

export default (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => (url !== router.pathname) && setLoading(true);
    const handleComplete = (url) => (url !== router.pathname) && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
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
      <Header className="app-layout-header" />
      <div className="app-layout-content">
        {loading && (
          <div className="app-layout-loading">
            <Spinner animation="grow" variant="primary" />
          </div>
        )}
        <Fade in={!loading} appear>
          {loading ? <div /> : (<div>{props.children}</div>)}
        </Fade>
      </div>
      <Footer className="app-layout-footer" />
    </div>
  );
};
