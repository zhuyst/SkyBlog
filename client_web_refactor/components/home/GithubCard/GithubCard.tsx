import React, { useEffect } from "react";
import { Card, List } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { IGithubCommit, listCommits } from "@/action/github";
import { GITHUB_PAGE_SIZE } from "@/action/pageSize";
import { useStoreSelector } from "@/store";
import GithubCardItem from "./GithubCardItem";

import "./GithubCard.scss";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCommits(GITHUB_PAGE_SIZE));
  }, []);

  const commits = useStoreSelector<IGithubCommit[]>((state) => state.github.commits);
  const loading = useStoreSelector<boolean>((state) => state.github.loading);

  const renderItem = (commit) => <GithubCardItem commit={commit} />;
  return (
    <Card className="github-card">
      <Card.Title>SkyBlog项目动态</Card.Title>
      <List
        dataSource={commits}
        renderItem={renderItem}
        loading={loading}
      />
    </Card>
  );
};
