import React from "react";
import { useDispatch } from "react-redux";
import { listArticles } from "@/action-creator/article/articles";
import { IPageInfo } from "@/define/common";
import { IArticle } from "@/define/article";
import List from "../../common/List";
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
