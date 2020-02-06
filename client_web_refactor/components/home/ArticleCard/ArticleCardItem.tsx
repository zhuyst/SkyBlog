import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setArticle } from "@/action-creator/article/article";
import { IArticle } from "@/define/article";

import "./ArticleCardItem.scss";

interface IArticleCardItemProps {
  article: IArticle;
  index: number;
}

export default (props: IArticleCardItemProps) => {
  const { article, index } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const push = async () => {
    dispatch(setArticle(article));
    await router.push(`/article/content/${article.id}/full`);
  };

  return (
    <div
      className="article-card-item"
      onClick={push}
      onKeyPress={push}
      role="link"
      tabIndex={index}
    >
      <h4 className="article-card-item-title">{article.title}</h4>
      <hr />
      <p className="article-card-item-content">{article.content}</p>
      <p className="article-card-item-date">
        发布时间 :
        {article.createDate}
      </p>
    </div>
  );
};
