import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import List from "@/components/common/List";
import { IGithubCommit } from "@/action/github";
import { GITHUB_PAGE_SIZE } from "@/action-creator/pageSize";
import { useStoreSelector } from "@/store";
import { listCommits } from "@/action-creator/github";
import GithubCardItem from "./GithubCardItem";

import "./GithubCard.scss";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCommits(GITHUB_PAGE_SIZE));
  }, [dispatch]);

  const commits = useStoreSelector<IGithubCommit[]>((state) => state.github.commits);
  const loading = useStoreSelector<boolean>((state) => state.github.loading);

  const renderItem = (commit: IGithubCommit) => <GithubCardItem commit={commit} />;
  return (
    <Card className="github-card">
      <Card.Header>SkyBlog项目动态</Card.Header>
      <Card.Body>
        <List
          dataSource={commits}
          renderItem={renderItem}
          loading={loading}
        />
      </Card.Body>
    </Card>
  );
};
