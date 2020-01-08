import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

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
    <Header className="app-layout-header" />
    <div className="app-layout-content">
      {props.children}
    </div>
    <Footer className="app-layout-footer" />
  </div>
);
