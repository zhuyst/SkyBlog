import {startSubmit,stopSubmit} from 'redux-form'

import {_delete, _get, _post, ARTICLE_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";
import {COMMENT_PAGE_SIZE, FORM_COMMENT} from "../../Constant";

export const SET_ARTICLE = "SET_ARTICLE";

export const INSERT_COMMENT_RESPONSE = "INSERT_COMMENT_RESPONSE";
export const LIST_COMMENTS_RESPONSE = "LIST_COMMENTS_RESPONSE";
export const DELETE_COMMENT_RESPONSE = "DELETE_COMMENT_RESPONSE";

export const setArticle = article => {
    return {
        type : SET_ARTICLE,
        article : article
    }
};

export const insertComment = (articleId, comment, pageNum) => dispatch => {
    dispatch(startSubmit(FORM_COMMENT));

    const url = ARTICLE_API_URL + `/${articleId}/comment/`;
    return _post(url,comment)
        .then(result => {
            dispatch(stopSubmit(FORM_COMMENT,result.errors));

            if(result.code === 200){
                dispatch(success("新增评论成功"));
                dispatch(insertCommentResponse(result));

                reloadComments(pageNum,articleId,dispatch);
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
    const url = ARTICLE_API_URL + `/public/${id}/comment/`;
    return _get(url,{
        pageNum : pageNum,
        pageSize: pageSize
    }).then(result => dispatch(listCommentsResponse(result)))
};

const listCommentsResponse = result => {
    return {
        type : LIST_COMMENTS_RESPONSE,
        comments : result.entity
    }
};

export const deleteComment = (id,articleId,pageNum) => dispatch => {
    dispatch(startSubmit(FORM_COMMENT));

    const url = ARTICLE_API_URL + `/comment/${id}`;
    return _delete(url)
        .then(result => {
            dispatch(stopSubmit(FORM_COMMENT,result.errors));

            if(result.code === 200){
                dispatch(success("删除评论成功"));
                dispatch(deleteCommentResponse(id));

                reloadComments(pageNum,articleId,dispatch);
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

const reloadComments = (pageNum,articleId,dispatch) => {
    // 重新加载大小为 pageNum*pageSize 的评论列表
    const pageSize = pageNum * COMMENT_PAGE_SIZE;
    dispatch(listComments(articleId,1,pageSize))
};