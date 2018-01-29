import fetch from 'isomorphic-fetch'
import {_insert, ARTICLE_API_URL, checkStatus, HttpMethod} from "../Api";

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export const LIST_ARTICLES = "LIST_ARTICLES";
export const GET_ARTICLE_INFO = "GET_ARTICLE_INFO";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const DELETE_ARTICLE  = "DELETE_ARTICLE";

export const INSERT_NEW_COMMENT = "INSERT_NEW_COMMENT";
export const LIST_COMMENTS = "LIST_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const insertArticle = article => dispatch => {
    const url = ARTICLE_API_URL + "/";

    return fetch(url,_insert(article))
        .then(response => checkStatus(response))
        .then(condition => insertArticleResponse(condition))
};

const insertArticleResponse = condition => {
    return {
        type : INSERT_ARTICLE_RESPONSE,
        condition : condition
    }
};

export const listArticles = (pageNum) => {
    return {
        type : LIST_ARTICLES,
        url : ARTICLE_API_URL + `/public/list/${pageNum}`,
        method : HttpMethod.GET
    }
};

export const getArticleInfo = (id) => {
    return {
        type : GET_ARTICLE_INFO,
        url : ARTICLE_API_URL + `/public/${id}`,
        method : HttpMethod.GET
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