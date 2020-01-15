import { NextPageContext, NextComponentType } from "next";
import withRedux from "next-redux-wrapper";
import App, { AppContext } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { IAppStore, initStore } from "@/store";
import AppLayout from "@/components/AppLayout";

import "./_app.scss";

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
