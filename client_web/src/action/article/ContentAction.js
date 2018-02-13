import {_delete, _get, _post, ARTICLE_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";

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

export const insertComment = (id, comment) => dispatch => {
    const url = ARTICLE_API_URL + `/${id}/comment/`;
    return _post(url,comment)
        .then(result => insertCommentResponse(result));
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
    const url = ARTICLE_API_URL + `/comment/${id}`;
    return _delete(url)
        .then(result => {
            if(result.code === 200){
                dispatch(success("删除评论成功"));
                dispatch(deleteCommentResponse(id));
            }
            else {
                dispatch(error(result.message));
            }
            return result;
        }).then(result => {
            if(result.code === 200){

                // 重新加载大小为 pageNum*10 的评论列表
                const pageSize = pageNum * 10;
                dispatch(listComments(articleId,1,pageSize))
            }
        })
};

const deleteCommentResponse = result => {
    return {
        type : DELETE_COMMENT_RESPONSE,
        result : result
    }
};