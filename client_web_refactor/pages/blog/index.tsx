import React from "react";
import { listArticles } from "@/action/article/articles";
import { IPageInfo } from "@/action/common";
import { IArticle } from "@/api/article";
import AppLayout from "@/components/AppLayout";
import ArticleList from "@/components/blog/ArticleList";
import { IThunkDispatch, useStoreSelector } from "@/store";
import { INextPage } from "../_app";

import "./index.scss";

const Blog: INextPage = () => {
  const page = useStoreSelector<IPageInfo<IArticle>>((state) => state.articles.page);
  const loading = useStoreSelector<boolean>((state) => state.articles.loading);

  return (
    <AppLayout>
      <div className="blog-main">
        <ArticleList pageInfo={page} loading={loading} />
      </div>
    </AppLayout>
  );
};

Blog.getInitialProps = async ({ store }) => {
  const { dispatch } = store;
  await dispatch(listArticles(1));
  return {};
};

export default Blog;
