import {startSubmit,stopSubmit} from 'redux-form'

import {_delete, _insert, _query, _update, ARTICLE_API_URL, HttpMethod} from "../Api";
import {error, info} from "./common/NotifyAction";
import {FORM_ARTICLE} from "../Form";

export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export const UPDATE_ARTICLE_RESPONSE = "UPDATE_ARTICLE_RESPONSE";
export const DELETE_ARTICLE_RESPONSE  = "DELETE_ARTICLE_RESPONSE";

export const INSERT_NEW_COMMENT = "INSERT_NEW_COMMENT";
export const LIST_COMMENTS = "LIST_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const insertArticle = article => dispatch => {
    dispatch(startSubmit(FORM_ARTICLE));

    const url = ARTICLE_API_URL + "/";
    return _insert(url,article)
        .then(result => {
            dispatch(stopSubmit(FORM_ARTICLE,result.errors));

            if(result.code === 200){
                dispatch(info("新增文章成功"));
                dispatch(insertArticleResponse(result))
            }
            else {
                dispatch(error(result.message));
            }
        })
        .then(() => dispatch(listArticles(1,5)))
};

const insertArticleResponse = result => {
    return {
        type : INSERT_ARTICLE_RESPONSE,
        article : result.entity
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

export const updateArticle = article => dispatch =>{
    dispatch(startSubmit(FORM_ARTICLE));

    const url = ARTICLE_API_URL + `/${article.id}`;
    return _update(url,article)
        .then(result => {
            dispatch(stopSubmit(FORM_ARTICLE,result.errors));

            if(result.code === 200){
                dispatch(info("更新文章成功"));
                dispatch(updateArticleResponse(result))
            }
            else {
                dispatch(error(result.message));
            }
        }).then(() => dispatch(listArticles(1,5)))
};

const updateArticleResponse = result =>{
    return {
        type : UPDATE_ARTICLE_RESPONSE,
        article : result.entity
    }
};

export const deleteArticle = id => dispatch => {
    dispatch(startSubmit(FORM_ARTICLE));

    const url = ARTICLE_API_URL + `/${id}`;
    return _delete(url)
        .then(result => {
            dispatch(stopSubmit(FORM_ARTICLE,result.errors));

            if(result.code === 200){
                dispatch(info("删除文章成功"));
                dispatch(deleteArticleResponse(result))
            }
            else {
                dispatch(error(result.message));
            }
        }).then(() => dispatch(listArticles(1,5)))
};

const deleteArticleResponse = result => {
    return {
        type : DELETE_ARTICLE_RESPONSE,
        result : result
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