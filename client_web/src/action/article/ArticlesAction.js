export const ARTICLE_CHANGE_PAGE = "ARTICLE_CHANGE_PAGE";

export const changePage = pageNum => {
    return {
        type : ARTICLE_CHANGE_PAGE,
        articles_pageNum : pageNum
    }
};