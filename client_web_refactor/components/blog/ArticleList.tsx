import {List} from "antd";
import React from "react";
import {useDispatch} from "react-redux";
import {listArticles} from "../../action/article/articles";
import {IArticle} from "../../api/article";
import {useStoreSelector} from "../../store";
import ArticleListItem from "./ArticleListItem";

interface IArticleListProps {
    articles: IArticle[];
    loading: boolean;
}

export default (props: IArticleListProps) => {
    const { articles, loading } = props;

    const dispatch = useDispatch();
    const onChange = (page: number) => {
        dispatch(listArticles(page));
    };

    const pageNum = useStoreSelector<number>((state) => state.articles.page.pageNum);
    const pageSize = useStoreSelector<number>((state) => state.articles.page.pageSize);
    const total = useStoreSelector<number>((state) => state.articles.page.total);

    const renderItem = (article) => <ArticleListItem article={article} />;
    return (
        <List
            className="article-list"
            dataSource={articles}
            renderItem={renderItem}
            loading={loading}
            pagination={{
                onChange, pageSize, total,
                current: pageNum,
            }}
        />
    );
};
