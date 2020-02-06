import { Action } from "redux";
import { startSubmit, stopSubmit } from "redux-form";
import msg from "@/action-creator/common/notify";
import { ApiResultCode, IApiResult } from "@/api";
import {
  fetchDeleteComments, fetchInsertComment, fetchListComments, IComment,
} from "@/api/article/comment";
import { initialPreviousComment } from "@/reducer/article/comments";
import { IAppState, IThunkAction } from "@/store";
import { IPageInfo } from "@/define/common";
import { FORM_COMMENT } from "../form";
import { COMMENT_PAGE_SIZE } from "../pageSize";
import {
  DELETE_COMMENT_RESPONSE,
  IDeleteCommentResponseAction,
  IInsertCommentResponseAction,
  IListCommentsResponseAction, INSERT_COMMENT_RESPONSE,
  ISetCommentsLoadingAction,
  ISetPreviousCommentAction, LIST_COMMENTS_RESPONSE,
  SET_COMMENTS_LOADING,
  SET_PREVIOUS_COMMENT,
} from "@/action/article/comment";

export function setPreviousComment(comment: IComment): ISetPreviousCommentAction {
  return {
    type: SET_PREVIOUS_COMMENT,
    comment,
  };
}

export function setCommentsLoading(loading: boolean): ISetCommentsLoadingAction {
  return {
    type: SET_COMMENTS_LOADING,
    loading,
  };
}

function listCommentsResponse(comments: IPageInfo<IComment>): IListCommentsResponseAction {
  return {
    type: LIST_COMMENTS_RESPONSE,
    comments,
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
      const { pageNum } = state.content.comments;
      const articleId = state.content.article.id;

      const pageSize = pageNum * COMMENT_PAGE_SIZE;
      dispatch(listComments(articleId, 1, pageSize));
    } else {
      msg.error(result.message);
    }
  };
}

function insertCommentResponse(comment: IComment): IInsertCommentResponseAction {
  return {
    type: INSERT_COMMENT_RESPONSE,
    comment,
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

function deleteCommentResponse(): IDeleteCommentResponseAction {
  return {
    type: DELETE_COMMENT_RESPONSE,
  };
}

export function deleteComment(id: number): IThunkAction {
  return modifyComment(
    () => fetchDeleteComments(id),
    "删除评论成功",
    deleteCommentResponse,
  );
}
