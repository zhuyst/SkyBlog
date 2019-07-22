import {message as msg} from "antd";
import {Action} from "redux";
import {startSubmit, stopSubmit} from "redux-form";
import {ApiResultCode, IApiResult} from "../../api";
import {fetchDeleteComments, fetchInsertComment, fetchListComments, IComment} from "../../api/article/comment";
import {initialPreviousComment} from "../../reducer/article/comments";
import {IAppState} from "../../store";
import {IPageInfo, IThunkAction} from "../common";
import {FORM_COMMENT} from "../form";
import {COMMENT_PAGE_SIZE} from "../pageSize";

interface ICommentAction<T> extends Action<T> {
    comment: IComment;
}

export const SET_PREVIOUS_COMMENT = "SET_PREVIOUS_COMMENT";
export interface ISetPreviousCommentAction extends ICommentAction<typeof SET_PREVIOUS_COMMENT> {}
export function setPreviousComment(comment: IComment): ISetPreviousCommentAction {
    return {
        type : SET_PREVIOUS_COMMENT,
        comment,
    };
}

export const SET_COMMENTS_LOADING = "SET_COMMENTS_LOADING";
export interface ISetCommentsLoadingAction extends Action<typeof SET_COMMENTS_LOADING> {
    loading: boolean;
}
export function setCommentsLoading(loading: boolean): ISetCommentsLoadingAction {
    return {
        type : SET_COMMENTS_LOADING,
        loading,
    };
}

export function insertComment(comment: IComment): IThunkAction {
    return modifyComment<IComment>(
        (getState) => {
            const articleId = getState().content.article.id;
            return fetchInsertComment(articleId, comment);
        },
        "新增评论成功",
        insertCommentResponse,
    );
}

export const INSERT_COMMENT_RESPONSE = "INSERT_COMMENT_RESPONSE";
export interface IInsertCommentResponseAction extends ICommentAction<typeof INSERT_COMMENT_RESPONSE> {}
function insertCommentResponse(comment: IComment): IInsertCommentResponseAction {
    return {
        type : INSERT_COMMENT_RESPONSE,
        comment,
    };
}

export function listComments(id: number, pageNum: number, pageSize: number): IThunkAction {
    return async (dispatch) => {
        dispatch(setCommentsLoading(true));

        const result = await fetchListComments(id, pageNum, pageSize);
        dispatch(setCommentsLoading(false));
        dispatch(listCommentsResponse(result.entity));
    };
}

export const LIST_COMMENTS_RESPONSE = "LIST_COMMENTS_RESPONSE";
export interface IListCommentsResponseAction extends Action<typeof LIST_COMMENTS_RESPONSE> {
    comments: IPageInfo<IComment>;
}
function listCommentsResponse(comments: IPageInfo<IComment>): IListCommentsResponseAction {
    return {
        type : LIST_COMMENTS_RESPONSE,
        comments,
    };
}

export function deleteComment(id: number): IThunkAction {
    return modifyComment(
        () => fetchDeleteComments(id),
        "删除评论成功",
        deleteCommentResponse,
    );
}

export const DELETE_COMMENT_RESPONSE = "DELETE_COMMENT_RESPONSE";
export interface IDeleteCommentResponseAction extends Action<typeof DELETE_COMMENT_RESPONSE> {
    result: IApiResult;
}
function deleteCommentResponse(result: IApiResult): IDeleteCommentResponseAction {
    return {
        type : DELETE_COMMENT_RESPONSE,
        result,
    };
}

function modifyComment<T = null>(
    fetchFunc: (getState: () => IAppState) => Promise<IApiResult<T>>,
    successMsg: string,
    commentResponseActionCreator: (result: T) => Action<any>,
): IThunkAction {
    return async (dispatch, getState) => {
        dispatch(startSubmit(FORM_COMMENT));

        const result = await fetchFunc(getState);
        dispatch(setPreviousComment(initialPreviousComment));
        dispatch(stopSubmit(FORM_COMMENT, result.errors));

        if (result.code === ApiResultCode.OK) {
            msg.success(successMsg);
            dispatch(commentResponseActionCreator(result.entity));

            // 重新加载大小为 pageNum*pageSize 的评论列表
            const state = getState();
            const pageNum = state.content.comments.pageNum;
            const articleId = state.content.article.id;

            const pageSize = pageNum * COMMENT_PAGE_SIZE;
            dispatch(listComments(articleId, 1, pageSize));
        } else {
            msg.error(result.message);
        }
    };
}

export type CommentAction = ISetCommentsLoadingAction | IInsertCommentResponseAction |
    ISetPreviousCommentAction | IListCommentsResponseAction;
