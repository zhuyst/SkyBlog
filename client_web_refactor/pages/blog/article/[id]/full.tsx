import { useRouter } from "next/router";
import React from "react";
import { getArticleInfo } from "@/action/article/article";
import Head from "@/components/common/Head";
import { INextPage } from "@/pages/_app";

const FullArticle: INextPage = () => (
  <>
    <Head title="Article" />
    <div />
  </>
);

FullArticle.getInitialProps = async ({ store }) => {
  const { dispatch } = store;

  const router = useRouter();
  const { id } = router.query;

  await dispatch(getArticleInfo(Number(id)));
};

export default FullArticle;
