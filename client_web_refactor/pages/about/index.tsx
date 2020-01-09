import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useStoreSelector } from "@/store";
import Head from "@/components/common/Head";
import { getAbout } from "@/action/about";
import { INextPage } from "@/pages/_app";

import "./index.scss";

const About: INextPage = () => {
  const content = useStoreSelector((state) => state.about.markdownContent);
  const loading = useStoreSelector<boolean>((state) => state.about.loading);

  return (
    <>
      <Head title="About" />
      <Container className="about-main" fluid>
        <Row>
          {loading ? (
            <div>
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : (
            <div>{content}</div>
          )}
        </Row>
      </Container>
    </>
  );
};

About.getInitialProps = async ({ store }) => {
  const { dispatch } = store;
  await Promise.all([
    dispatch(getAbout()),
  ]);
  return {};
};

export default About;
