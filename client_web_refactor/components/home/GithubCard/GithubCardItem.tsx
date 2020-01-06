import React from "react";
import { IGithubCommit } from "../../../action/github";

import "./GithubCardItem.scss";

interface IGithubCardItemProps {
  commit: IGithubCommit;
}

export default (props: IGithubCardItemProps) => {
  const { commit } = props;

  return (
    <div className="github-card-item">
      <div className="github-card-item-content">
        <strong>
          <a href={commit.authorUrl} target="_blank">
            {commit.author}
          </a>
        </strong>
        <span>&nbsp;&nbsp;提交了&nbsp;&nbsp;</span>
        <a href={commit.commitUrl} target="_blank">
          {commit.message}
        </a>
        <span>&nbsp;&nbsp;到项目中</span>
      </div>
    </div>
  );
};
