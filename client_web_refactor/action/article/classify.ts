import { Action } from "redux";
import { IClassify } from "@/define/classify";

export const SET_CLASSIFY_SHOW = "SET_CLASSIFY_SHOW";
export interface ISetClassifyShowAction extends Action<typeof SET_CLASSIFY_SHOW> {
  show: boolean;
}

export const SET_CLASSIFY_LOADING = "SET_CLASSIFY_LOADING";
export interface ISetClassifyLoadingAction
  extends Action<typeof SET_CLASSIFY_LOADING> {
  loading: boolean;
}

export interface IClassifyResponseAction<T> extends Action<T> {
  list: IClassify[];
}

export const LIST_CLASSIFY_RESPONSE = "LIST_CLASSIFY_RESPONSE";
export interface IListClassifyResponseAction
  extends IClassifyResponseAction<typeof LIST_CLASSIFY_RESPONSE> {}

export const INSERT_CLASSIFY_RESPONSE = "INSERT_CLASSIFY_RESPONSE";
export interface IInsertClassifyResponseAction
  extends IClassifyResponseAction<typeof INSERT_CLASSIFY_RESPONSE> {}

export const UPDATE_CLASSIFY_RESPONSE = "UPDATE_CLASSIFY_RESPONSE";
export interface IUpdateClassifyResponseAction
  extends IClassifyResponseAction<typeof UPDATE_CLASSIFY_RESPONSE> {}

export const DELETE_CLASSIFY_RESPONSE = "DELETE_CLASSIFY_RESPONSE";
export interface IDeleteClassifyResponseAction
  extends IClassifyResponseAction<typeof DELETE_CLASSIFY_RESPONSE> {}

export type ClassifyAction = ISetClassifyLoadingAction | IListClassifyResponseAction |
IInsertClassifyResponseAction | IDeleteClassifyResponseAction |
IUpdateClassifyResponseAction | ISetClassifyShowAction;
