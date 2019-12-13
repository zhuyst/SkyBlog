import {List} from "antd";
import React from "react";
import {useDispatch} from "react-redux";
import {listArticles} from "../../action/article/articles";
import {IPageInfo} from "../../action/common";
import {IArticle} from "../../api/article";
import ArticleListItem from "./ArticleListItem";

interface IArticleListProps {
    pageInfo: IPageInfo<IArticle>;
    loading: boolean;
}

export default (props: IArticleListProps) => {
    const { pageInfo, loading } = props;
    const { list, pageNum, pageSize, total } = pageInfo;

    const dispatch = useDispatch();
    const onChange = (page: number) => {
        dispatch(listArticles(page));
    };

    const renderItem = (article) => <ArticleListItem article={article} />;
    return (
        <List
            className="article-list"
            dataSource={list}
            renderItem={renderItem}
            loading={loading}
            pagination={{
                onChange, pageSize, total,
                current: pageNum,
            }}
        />
    );
};
