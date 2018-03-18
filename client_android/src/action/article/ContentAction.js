import {startSubmit,stopSubmit,change} from 'redux-form'

import {_delete, _get, _post, _put, ARTICLE_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";
import {ARTICLE_PAGE_SIZE, COMMENT_PAGE_SIZE, FORM_ARTICLE, FORM_COMMENT} from "../../Constant";
import {initialPreviousComment} from "../../reducer/article/ContentReducer";
import {replace} from "react-router-redux";
import {listClassify} from "./ClassifyAction";
import {listArticles} from "./ArticlesAction";

export const SET_ARTICLE = "SET_ARTICLE";
export const SET_PREVIOUS_COMMENT = "SET_PREVIOUS_COMMENT";

export const SET_COMMENTS_LOADING = "SET_COMMENTS_LOADING";
export const SET_ARTICLE_LOADING = "SET_ARTICLE_LOADING";

export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export const UPDATE_ARTICLE_RESPONSE = "UPDATE_ARTICLE_RESPONSE";
export const DELETE_ARTICLE_RESPONSE  = "DELETE_ARTICLE_RESPONSE";

export const INSERT_COMMENT_RESPONSE = "INSERT_COMMENT_RESPONSE";
export const LIST_COMMENTS_RESPONSE = "LIST_COMMENTS_RESPONSE";
export const DELETE_COMMENT_RESPONSE = "DELETE_COMMENT_RESPONSE";

export const setArticle = article => {
    return {
        type : SET_ARTICLE,
        article : article
    }
};

export const setPreviousComment = comment => {
    return {
        type : SET_PREVIOUS_COMMENT,
        previous_comment : comment
    }
};

export const setCommentsLoading = loading => {
    return {
        type : SET_COMMENTS_LOADING,
        comments_loading: loading
    }
};

export const setArticleLoading = loading => {
    return {
        type : SET_ARTICLE_LOADING,
        article_loading : loading
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

export const insertComment = comment => (dispatch,getState) => {
    dispatch(startSubmit(FORM_COMMENT));

    const articleId = getState().content.article.id;
    const url = ARTICLE_API_URL + `/${articleId}/comment/`;

    return _post(url,comment)
        .then(result => {
            dispatch(setPreviousComment(initialPreviousComment));
            dispatch(stopSubmit(FORM_COMMENT,result.errors));

            if(result.code === 200){
                dispatch(success("新增评论成功"));
                dispatch(insertCommentResponse(result));

                reloadComments(dispatch,getState);
            }
            else {
                dispatch(error(result.message));
            }
        });
};

const insertCommentResponse = result => {
    return {
        type : INSERT_COMMENT_RESPONSE,
        comment : result.entity
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

export const listComments = (id,pageNum,pageSize) => dispatch => {
    dispatch(setCommentsLoading(true));

    const url = ARTICLE_API_URL + `/public/${id}/comment/`;
    return _get(url,{
        pageNum : pageNum,
        pageSize: pageSize
    }).then(result => {
        dispatch(setCommentsLoading(false));
        dispatch(listCommentsResponse(result))
    })
};

const listCommentsResponse = result => {
    return {
        type : LIST_COMMENTS_RESPONSE,
        comments : result.entity
    }
};

export const deleteComment = id => (dispatch,getState) => {
    dispatch(startSubmit(FORM_COMMENT));

    const url = ARTICLE_API_URL + `/comment/${id}`;
    return _delete(url)
        .then(result => {
            dispatch(stopSubmit(FORM_COMMENT,result.errors));

            if(result.code === 200){
                dispatch(success("删除评论成功"));
                dispatch(deleteCommentResponse(id));

                reloadComments(dispatch,getState);
            }
            else {
                dispatch(error(result.message));
            }
        })
};

const deleteCommentResponse = result => {
    return {
        type : DELETE_COMMENT_RESPONSE,
        result : result
    }
};

// 重新加载大小为 pageNum*pageSize 的评论列表
const reloadComments = (dispatch,getState) => {
    const pageNum = getState().content.comments.page_num;
    const articleId = getState().content.article.id;

    const pageSize = pageNum * COMMENT_PAGE_SIZE;
    dispatch(listComments(articleId,1,pageSize))
};