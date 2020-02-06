import { Action } from "redux";
import { IComment } from "@/api/article/comment";
import { IPageInfo } from "@/define/common";

interface ICommentAction<T> extends Action<T> {
  comment: IComment;
}

export const SET_PREVIOUS_COMMENT = "SET_PREVIOUS_COMMENT";
export interface ISetPreviousCommentAction extends ICommentAction<typeof SET_PREVIOUS_COMMENT> {}

export const SET_COMMENTS_LOADING = "SET_COMMENTS_LOADING";
export interface ISetCommentsLoadingAction
  extends Action<typeof SET_COMMENTS_LOADING> {
  loading: boolean;
}

export const LIST_COMMENTS_RESPONSE = "LIST_COMMENTS_RESPONSE";
export interface IListCommentsResponseAction extends Action<typeof LIST_COMMENTS_RESPONSE> {
  comments: IPageInfo<IComment>;
}

export const INSERT_COMMENT_RESPONSE = "INSERT_COMMENT_RESPONSE";
export interface IInsertCommentResponseAction
  extends ICommentAction<typeof INSERT_COMMENT_RESPONSE> {}

export const DELETE_COMMENT_RESPONSE = "DELETE_COMMENT_RESPONSE";
export interface IDeleteCommentResponseAction extends Action<typeof DELETE_COMMENT_RESPONSE> {}

export type CommentAction = ISetCommentsLoadingAction | IInsertCommentResponseAction |
ISetPreviousCommentAction | IListCommentsResponseAction;
