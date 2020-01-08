import { Action } from "redux";
import { startSubmit, stopSubmit } from "redux-form";
import { ThunkDispatch } from "redux-thunk";
import msg from "../common/notify";
import { ApiResultCode, IApiResult } from "@/api";
import {
  fetchDeleteClassify,
  fetchInsertClassify,
  fetchListClassify,
  fetchUpdateClassify,
  IClassify,
} from "@/api/classify";
import { IAppState, IThunkAction } from "@/store";
import { FORM_CLASSIFY } from "../form";

export const SET_CLASSIFY_SHOW = "SET_CLASSIFY_SHOW";
export interface ISetClassifyShowAction extends Action<typeof SET_CLASSIFY_SHOW> {
  show: boolean;
}
export function setClassifyShow(show: boolean): ISetClassifyShowAction {
  return {
    type: SET_CLASSIFY_SHOW,
    show,
  };
}

export const SET_CLASSIFY_LOADING = "SET_CLASSIFY_LOADING";
export interface ISetClassifyLoadingAction
  extends Action<typeof SET_CLASSIFY_LOADING> {
  loading: boolean;
}
export function setClassifyLoading(loading: boolean): ISetClassifyLoadingAction {
  return {
    type: SET_CLASSIFY_LOADING,
    loading,
  };
}

function modifyClassify(
  fetchFunc: () => Promise<IApiResult<IClassify[]>>,
  successMsg: string,
  classifyResponseActionCreator: (result: IApiResult<IClassify[]>) => IClassifyResponseAction<any>,
  extraSuccessFunc?: (dispatch: ThunkDispatch<IAppState, null, Action<string>>) => void,
): IThunkAction {
  return async (dispatch) => {
    dispatch(startSubmit(FORM_CLASSIFY));

    const result = await fetchFunc();
    dispatch(stopSubmit(FORM_CLASSIFY, result.errors));

    if (result.code === ApiResultCode.OK) {
      msg.success(successMsg);
      dispatch(classifyResponseActionCreator(result));
      dispatch(setClassifyLoading(false));

      if (extraSuccessFunc) {
        extraSuccessFunc(dispatch);
      }
    } else {
      msg.error(result.message);
    }
  };
}

interface IClassifyResponseAction<T> extends Action<T> {
  list: IClassify[];
}

export const LIST_CLASSIFY_RESPONSE = "LIST_CLASSIFY_RESPONSE";
export interface IListClassifyResponseAction
  extends IClassifyResponseAction<typeof LIST_CLASSIFY_RESPONSE> {}
function listClassifyResponse(result: IApiResult<IClassify[]>): IListClassifyResponseAction {
  return {
    type: LIST_CLASSIFY_RESPONSE,
    list: result.entity,
  };
}

export function listClassify(): IThunkAction {
  return async (dispatch) => {
    const result = await fetchListClassify();
    dispatch(listClassifyResponse(result));
    dispatch(setClassifyLoading(false));
  };
}

export const INSERT_CLASSIFY_RESPONSE = "INSERT_CLASSIFY_RESPONSE";
export interface IInsertClassifyResponseAction
  extends IClassifyResponseAction<typeof INSERT_CLASSIFY_RESPONSE> {}
function insertClassifyResponse(result: IApiResult<IClassify[]>): IInsertClassifyResponseAction {
  return {
    type: INSERT_CLASSIFY_RESPONSE,
    list: result.entity,
  };
}

export function insertClassify(classify: IClassify): IThunkAction {
  return modifyClassify(
    () => fetchInsertClassify(classify),
    "新增文章分类成功",
    insertClassifyResponse,
    (dispatch) => dispatch(setClassifyShow(false)),
  );
}

export const UPDATE_CLASSIFY_RESPONSE = "UPDATE_CLASSIFY_RESPONSE";
export interface IUpdateClassifyResponseAction
  extends IClassifyResponseAction<typeof UPDATE_CLASSIFY_RESPONSE> {}
function updateClassifyResponse(result: IApiResult<IClassify[]>): IUpdateClassifyResponseAction {
  return {
    type: UPDATE_CLASSIFY_RESPONSE,
    list: result.entity,
  };
}

export function updateClassify(classify: IClassify): IThunkAction {
  return modifyClassify(
    () => fetchUpdateClassify(classify),
    "更新文章分类成功",
    updateClassifyResponse,
  );
}

export const DELETE_CLASSIFY_RESPONSE = "DELETE_CLASSIFY_RESPONSE";
export interface IDeleteClassifyResponseAction
  extends IClassifyResponseAction<typeof DELETE_CLASSIFY_RESPONSE> {}
function deleteClassifyResponse(result: IApiResult<IClassify[]>): IDeleteClassifyResponseAction {
  return {
    type: DELETE_CLASSIFY_RESPONSE,
    list: result.entity,
  };
}

export function deleteClassify(id: number): IThunkAction {
  return modifyClassify(
    () => fetchDeleteClassify(id),
    "删除文章分类成功",
    deleteClassifyResponse,
  );
}

export type ClassifyAction = ISetClassifyLoadingAction | IListClassifyResponseAction |
IInsertClassifyResponseAction | IDeleteClassifyResponseAction |
IUpdateClassifyResponseAction | ISetClassifyShowAction;
