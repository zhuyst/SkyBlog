import React from "react";
import {
  Card, ButtonToolbar, ToggleButton, ToggleButtonGroup,
} from "react-bootstrap";
import { IArticle } from "@/api/article";
import { IBaseProps, LayoutType } from "@/define";
import { useStoreSelector } from "@/store";

interface IArticleTitleProps extends IBaseProps {
  layout: LayoutType;
  setCurrentLayout: (layout: LayoutType) => void;
}

const LayoutButton = (layout: LayoutType, text: string) => (
  <ToggleButton variant="light" value={layout}>
    {text}
  </ToggleButton>
);

export default (props: IArticleTitleProps) => {
  const article = useStoreSelector<IArticle>((state) => state.article);
  const {
    id, title, subTitle,
  } = article;

  const changeLayout = (layout: LayoutType) => {
    props.setCurrentLayout(layout);
    window.history.replaceState(null, "",
      `/blog/article/${id}?layout=${layout}`);
  };

  return (
    <div className="article-header">
      <Card.Title>
        <h1>{title}</h1>
      </Card.Title>
      <Card.Subtitle>
        <h3 className="mb-2 text-muted">{subTitle}</h3>
      </Card.Subtitle>
      <ButtonToolbar>
        <ToggleButtonGroup
          type="radio"
          name="layout"
          value={props.layout}
          onChange={changeLayout}
        >
          {LayoutButton(LayoutType.JUSTIFY, "左右布局")}
          {LayoutButton(LayoutType.FULL, "上下布局")}
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
  );
};
