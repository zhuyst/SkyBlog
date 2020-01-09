import React from "react";
import { useDispatch } from "react-redux";
import List from "../common/List";
import { listArticles } from "@/action/article/articles";
import { IPageInfo } from "@/action/common";
import { IArticle } from "@/api/article";
import ArticleListItem from "./ArticleListItem";

interface IArticleListProps {
  pageInfo: IPageInfo<IArticle>;
  loading: boolean;
}

export default (props: IArticleListProps) => {
  const { pageInfo, loading } = props;
  const {
    list, pageNum, pages,
  } = pageInfo;

  const dispatch = useDispatch();
  const onChange = (page: number) => {
    dispatch(listArticles(page));
  };

  const renderItem = (article: IArticle) => <ArticleListItem article={article} />;
  return (
    <List
      className="article-list"
      dataSource={list}
      renderItem={renderItem}
      loading={loading}
      pagination={{
        onChange, pages, pageNum,
      }}
    />
  );
};
