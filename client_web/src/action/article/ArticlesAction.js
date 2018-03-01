import {_get, ARTICLE_API_URL} from "../../Api";

export const SET_ARTICLES_LOADING = "SET_ARTICLES_LOADING";
export const SET_CLASSIFY_ARTICLES_LOADING = "SET_CLASSIFY_ARTICLES_LOADING";

export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export const LIST_ARTICLES_BY_CLASSIFY_RESPONSE = "LIST_ARTICLES_BY_CLASSIFY_RESPONSE";

export const setArticlesLoading = loading => {
    return {
        type : SET_ARTICLES_LOADING,
        loading : loading
    }
};

export const setClassifyArticlesLoading = loading => {
    return {
        type : SET_CLASSIFY_ARTICLES_LOADING,
        loading : loading
    }
};

export const listArticles = (pageNum,pageSize) => dispatch => {
    dispatch(setArticlesLoading(true));

    const url = ARTICLE_API_URL + "/public/list/";
    return _get(url, {
            pageNum : pageNum,
            pageSize : pageSize
        }).then(result => {
            dispatch(setArticlesLoading(false));
            dispatch(listArticlesResponse(result))
    })
};

const listArticlesResponse = result => {
    return {
        type : LIST_ARTICLES_RESPONSE,
        page : result.entity
    }
};

export const listArticlesByClassify = (classifyId,pageNum,pageSize) => dispatch => {
    dispatch(setClassifyArticlesLoading(true));

    const url = ARTICLE_API_URL + `/public/classify/${classifyId}/`;
    return _get(url,{
        pageNum : pageNum,
        pageSize : pageSize
    }).then(result => {
        dispatch(setClassifyArticlesLoading(false));
        dispatch(listArticlesByClassifyResponse(result));
        document.title = `${result.entity.classify.name} - 博客文章 - 青云的小窝`;
    })
};

const listArticlesByClassifyResponse = result => {
    return {
        type : LIST_ARTICLES_BY_CLASSIFY_RESPONSE,
        vo : result.entity
    }
};