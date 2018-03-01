import {startSubmit,stopSubmit} from 'redux-form'

import {_delete, _get, _post, ARTICLE_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";
import {COMMENT_PAGE_SIZE, FORM_COMMENT} from "../../Constant";
import {initialPreviousComment} from "../../reducer/article/ContentReducer";

export const SET_ARTICLE = "SET_ARTICLE";
export const SET_PREVIOUS_COMMENT = "SET_PREVIOUS_COMMENT";
export const SET_COMMENTS_LOADING = "SET_COMMENTS_LOADING";

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