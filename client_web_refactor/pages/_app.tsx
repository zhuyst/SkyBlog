import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import {Store} from "redux";
import { initStore } from "../store";

import "antd/dist/antd.css";

interface IReduxAppProps {
    store: Store;
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
                <Container>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Container>
            );
        }
    },
);
