import { NextPageContext, NextComponentType } from "next";
import withRedux from "next-redux-wrapper";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { IAppStore, initStore } from "@/store";

import "./_app.scss";

export interface INextPageContext extends NextPageContext {
  store: IAppStore;
  isServer: boolean;
}

export type INextPage<P = {}, IP = P> = NextComponentType<INextPageContext, IP, P>;

interface IReduxAppProps {
  store: IAppStore;
}

export default withRedux(initStore)(
  class MyApp extends App<IReduxAppProps> {
    public static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      };
    }

    public render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  },
);
