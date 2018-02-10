import {_insert, _query, ARTICLE_API_URL, HttpMethod} from "../Api";

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const DELETE_ARTICLE  = "DELETE_ARTICLE";

export const INSERT_NEW_COMMENT = "INSERT_NEW_COMMENT";
export const LIST_COMMENTS = "LIST_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const insertArticle = article => dispatch => {
    const url = ARTICLE_API_URL + "/";

    return _insert(url,article)
        .then(result => dispatch(insertArticleResponse(result)))
};

const insertArticleResponse = result => {
    return {
        type : INSERT_ARTICLE_RESPONSE,
        result : result
    }
};

export const listArticles = (pageNum,pageSize) => dispatch => {
    return _query(ARTICLE_API_URL + "/public/list/", {
            pageNum : pageNum,
            pageSize : pageSize
        }).then(result => dispatch(listArticlesResponse(result)))
};

const listArticlesResponse = result => {
    return {
        type : LIST_ARTICLES_RESPONSE,
        page : result.entity
    }
};

export const getArticleInfo = id => dispatch => {
    const url = ARTICLE_API_URL + `/public/${id}`;
    return _query(url)
        .then(result => dispatch(getArticleInfoResponse(result)))
};

const getArticleInfoResponse = result => {
    return {
        type : GET_ARTICLE_INFO_RESPONSE,
        article : result.entity
    }
};

export const updateArticle = (article) => {
    return {
        type : UPDATE_ARTICLE,
        url : ARTICLE_API_URL + `/${article.id}`,
        method : HttpMethod.PUT,
        article : article
    }
};

export const deleteArticle = (id) => {
    return {
        type : DELETE_ARTICLE,
        url : ARTICLE_API_URL + `/${id}`,
        method : HttpMethod.DELETE
    }
};

export const insertNewComment = (id,comment) => {
    return {
        type : INSERT_NEW_COMMENT,
        url : ARTICLE_API_URL + `/${id}/comment/`,
        method : HttpMethod.POST,
        comment : comment
    }
};

export const listComments = (id,pageNum) => {
    return {
        type : LIST_COMMENTS,
        url : ARTICLE_API_URL + `/public/${id}/comment/${pageNum}`,
        method : HttpMethod.GET
    }
};

export const deleteComment = (id) => {
    return {
        type : DELETE_COMMENT,
        url : ARTICLE_API_URL + `/comment/${id}`,
        method : HttpMethod.DELETE
    }
};