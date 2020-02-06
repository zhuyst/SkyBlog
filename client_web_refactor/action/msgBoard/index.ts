import { Action } from "redux";
import { IPageInfo } from "@/define/common";
import { IMsg } from "@/define/msgBoard";

interface IMsgAction<T> extends Action<T> {
  msg: IMsg;
}

export const SET_MSG_LOADING = "SET_MSG_LOADING";
export interface ISetMsgLoadingAction extends Action<typeof SET_MSG_LOADING> {
  loading: boolean;
}

export const SET_PREVIOUS_MSG = "SET_PREVIOUS_MSG";
export interface ISetPreviousMsgAction extends IMsgAction<typeof SET_PREVIOUS_MSG> {}

export const LIST_MSG_RESPONSE = "LIST_MSG_RESPONSE";
export interface IListMsgResponseAction extends Action<typeof LIST_MSG_RESPONSE> {
  page: IPageInfo<IMsg>;
}

export const INSERT_MSG_RESPONSE = "INSERT_MSG_RESPONSE";
export interface IInsertMsgResponseAction extends IMsgAction<typeof INSERT_MSG_RESPONSE> {}

export const DELETE_MSG_RESPONSE = "DELETE_MSG_RESPONSE";
export interface IDeleteMsgResponseAction extends Action<typeof DELETE_MSG_RESPONSE> {}

export type MsgBoardAction = ISetMsgLoadingAction | ISetPreviousMsgAction |
IListMsgResponseAction;
