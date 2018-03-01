import {startSubmit, stopSubmit} from 'redux-form'
import {replace} from 'react-router-redux'
import {change} from 'redux-form'

import {_delete, _post, _get, _put, ARTICLE_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";
import {ARTICLE_PAGE_SIZE, COMMENT_PAGE_SIZE, FORM_ARTICLE, FORM_COMMENT} from "../../Constant";
import {listComments} from "./ContentAction";
import {listClassify} from "./ClassifyAction";

export const SET_ARTICLES_LOADING = "SET_ARTICLES_LOADING";
export const SET_CLASSIFY_ARTICLES_LOADING = "SET_CLASSIFY_ARTICLES_LOADING";

export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export const LIST_ARTICLES_BY_CLASSIFY_RESPONSE = "LIST_ARTICLES_BY_CLASSIFY_RESPONSE";
export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export const UPDATE_ARTICLE_RESPONSE = "UPDATE_ARTICLE_RESPONSE";
export const DELETE_ARTICLE_RESPONSE  = "DELETE_ARTICLE_RESPONSE";

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

export const insertArticle = (article,back) => dispatch => {
    dispatch(startSubmit(FORM_ARTICLE));

    const url = ARTICLE_API_URL + "/";
    return _post(url,article)
        .then(result => {
            dispatch(stopSubmit(FORM_ARTICLE,result.errors));

            if(result.code === 200){
                dispatch(success("发布文章成功"));
                dispatch(insertArticleResponse(result));

                afterHandle(dispatch);

                if(back){
                    dispatch(replace(`/article/content/${result.entity.id}/justify`))
                }
                else {
                    dispatch(replace(`/article/content/${result.entity.id}/edit`))
                }
            }
            else {
                dispatch(error(result.message));
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

export const getArticleInfo = id => dispatch => {
    const url = ARTICLE_API_URL + `/public/${id}`;
    return _get(url)
        .then(result => {
            dispatch(getArticleInfoResponse(result));

            const article = result.entity;
            const id = article.id;
            dispatch(change(FORM_COMMENT,"article_id",id));
            dispatch(listComments(id,1,COMMENT_PAGE_SIZE));

            document.title = `${article.title} - 博客文章 - 青云的小窝`;
        })
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
                dispatch(updateArticleResponse(result));

                afterHandle(dispatch);

                if(back){
                    dispatch(replace(`/article/content/${result.entity.id}/justify`))
                }
            }
            else {
                dispatch(error(result.message));
            }
        });
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
                dispatch(deleteArticleResponse(result));

                afterHandle(dispatch);
                dispatch(replace("/article"));
            }
            else {
                dispatch(error(result.message));
            }
        })
};

const deleteArticleResponse = result => {
    return {
        type : DELETE_ARTICLE_RESPONSE,
        result : result
    }
};

const afterHandle = dispatch => {
    dispatch(listArticles(1,ARTICLE_PAGE_SIZE));
    dispatch(listClassify());
};