import { NextPageContext, NextComponentType } from "next";
import withRedux from "next-redux-wrapper";
import App, { AppContext } from "next/app";
import React from "react";
import Router from "next/router";
import { Provider } from "react-redux";
import { IAppStore, initStore } from "@/store";
import AppLayout from "@/components/AppLayout";

import "./_app.scss";

// 修复dev模式下切换路由，css不会重新加载的问题
// https://github.com/zeit/next-plugins/issues/282
Router.events.on("routeChangeComplete", () => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  const href = "/_next/static/css/styles.chunk.css";
  const els = document.querySelectorAll(`link[href^="${href}"]`);
  els.forEach((el) => {
    const newCss = el.cloneNode() as HTMLElement;
    newCss.setAttribute("href", `${href}?v=${Date.now()}`);
    newCss.onload = () => el.remove();
    if (el.parentNode) {
      el.parentNode.appendChild(newCss);
    }
  });
});

interface INextPageContext extends NextPageContext {
  store: IAppStore;
  isServer: boolean;
}

export type INextPage<P = {}, IP = P> = NextComponentType<INextPageContext, IP, P>;

interface IReduxAppProps {
  store: IAppStore;
}

export default withRedux(initStore)(
  class MyApp extends App<IReduxAppProps> {
    static async getInitialProps({ Component, ctx }: AppContext) {
      const c = ctx as INextPageContext;
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(c)
          : {},
      };
    }

    public render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Provider store={store}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Provider>
      );
    }
  },
);
