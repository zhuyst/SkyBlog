import React from "react";
import {
  Card, ToggleButton, ToggleButtonGroup,
} from "react-bootstrap";
import { FaAlignJustify, FaAlignLeft } from "react-icons/fa";
import { IArticle } from "@/api/article";
import { IBaseProps, LayoutType } from "@/define";
import { useStoreSelector } from "@/store";

import "./ArticleHeader.scss";

interface IArticleTitleProps extends IBaseProps {
  layout: LayoutType;
  setCurrentLayout: (layout: LayoutType) => void;
}

export default (props: IArticleTitleProps) => {
  const article = useStoreSelector<IArticle>((state) => state.article);
  const {
    id, title, subTitle, createDate, updateDate, classify,
  } = article;

  const changeLayout = (layout: LayoutType) => {
    props.setCurrentLayout(layout);
    window.history.replaceState(null, "",
      `/blog/article/${id}?layout=${layout}`);
  };

  return (
    <div className="article-header">
      <Card.Title>
        <h1 className="article-title">{title}</h1>
        <small className="title-info d-none d-lg-block">
          <span>
            文章发布时间：
            {createDate}
          </span>
          <br />
          <span>
            最后修改时间：
            {updateDate}
          </span>
          <br />
          <span>
            分类：
            {classify ? classify.name : "未分类"}
          </span>
        </small>
      </Card.Title>
      <Card.Subtitle>
        <h3 className="mb-2 text-muted">{subTitle}</h3>
      </Card.Subtitle>
      <ToggleButtonGroup
        className="layout-button-group d-none d-lg-flex"
        type="radio"
        name="layout"
        value={props.layout}
        onChange={changeLayout}
      >
        <ToggleButton variant="light" value={LayoutType.JUSTIFY}>
          <FaAlignLeft />
          &nbsp;&nbsp;左右布局
        </ToggleButton>
        <ToggleButton variant="light" value={LayoutType.FULL}>
          <FaAlignJustify />
          &nbsp;&nbsp;上下布局
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
