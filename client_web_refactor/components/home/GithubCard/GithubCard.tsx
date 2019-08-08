import {Card, List} from "antd";
import React from "react";
import {IGithubCommit} from "../../../action/github";
import {useStoreSelector} from "../../../store";
import GithubCardItem from "./GithubCardItem";

import "./GithubCard.less";

export default () => {
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
