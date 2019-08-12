import {Card, List} from "antd";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {IGithubCommit, listCommits} from "../../../action/github";
import {GITHUB_PAGE_SIZE} from "../../../action/pageSize";
import {useStoreSelector} from "../../../store";
import GithubCardItem from "./GithubCardItem";

import "./GithubCard.less";

export default () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listCommits(GITHUB_PAGE_SIZE));
    }, []);

    const commits = useStoreSelector<IGithubCommit[]>((state) => state.github.commits);
    const loading = useStoreSelector<boolean>((state) => state.github.loading);

    const renderItem = (commit) => <GithubCardItem commit={commit} />;
    return (
        <Card className="github-card" title="SkyBlog项目动态">
            <List
                dataSource={commits}
                renderItem={renderItem}
                loading={loading}
            />
        </Card>
    );
};
