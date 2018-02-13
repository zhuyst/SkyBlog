import {startSubmit, stopSubmit} from 'redux-form'
import {replace} from 'react-router-redux'

import {_delete, _post, _get, _put, ARTICLE_API_URL} from "../Api";
import {error, success} from "./common/NotifyAction";
import {FORM_ARTICLE} from "../Form";
import {listComments} from "./article/ContentAction";

export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export const UPDATE_ARTICLE_RESPONSE = "UPDATE_ARTICLE_RESPONSE";
export const DELETE_ARTICLE_RESPONSE  = "DELETE_ARTICLE_RESPONSE";

export const insertArticle = (article,back) => dispatch => {
    dispatch(startSubmit(FORM_ARTICLE));

    const url = ARTICLE_API_URL + "/";
    return _post(url,article)
        .then(result => {
            dispatch(stopSubmit(FORM_ARTICLE,result.errors));

            if(result.code === 200){
                dispatch(success("新增文章成功"));
                dispatch(insertArticleResponse(result));
            }
            else {
                dispatch(error(result.message));
            }
            return result;
        }).then(result => {
            dispatch(listArticles(1,5));
            return result;
        }).then(result => {
            if(result.code === 200){
                if(back){
                    dispatch(replace(`/article/${result.entity.id}`))
                }
                else {
                    dispatch(replace(`/article/${result.entity.id}/edit`))
                }
            }
        })
};

const insertArticleResponse = result => {
    return {
        type : INSERT_ARTICLE_RESPONSE,
        article : result.entity
    }
};

export const listArticles = (pageNum,pageSize) => dispatch => {
    return _get(ARTICLE_API_URL + "/public/list/", {
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
    return _get(url)
        .then(result => {
            dispatch(getArticleInfoResponse(result));
            return result;
        }).then(result => dispatch(listComments(result.entity.id,1,10)))
};

const getArticleInfoResponse = result => {
    return {
        type : GET_ARTICLE_INFO_RESPONSE,
        article : result.entity
    }
};

export const updateArticle = (article,back) => dispatch =>{
    dispatch(startSubmit(FORM_ARTICLE));

    const url = ARTICLE_API_URL + `/${article.id}`;
    return _put(url,article)
        .then(result => {
            dispatch(stopSubmit(FORM_ARTICLE,result.errors));

            if(result.code === 200){
                dispatch(success("更新文章成功"));
                dispatch(updateArticleResponse(result))
            }
            else {
                dispatch(error(result.message));
            }

            return result;
        }).then(result => {
            dispatch(listArticles(1,5));
            return result;
        }).then(result => {
            if(back && result.code === 200){
                dispatch(replace(`/article/${result.entity.id}`))
            }
        })
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
                dispatch(success("删除文章成功"));
                dispatch(deleteArticleResponse(result))
            }
            else {
                dispatch(error(result.message));
            }
        }).then(() => dispatch(listArticles(1,5)))
        .then(() => dispatch(replace("/article")))
};

const deleteArticleResponse = result => {
    return {
        type : DELETE_ARTICLE_RESPONSE,
        result : result
    }
};