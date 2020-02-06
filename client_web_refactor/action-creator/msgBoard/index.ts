import { Action } from "redux";
import { startSubmit, stopSubmit } from "redux-form";
import message from "@/action-creator/common/notify";
import { ApiResultCode, IApiResult } from "@/api";
import {
  fetchDeleteMsg, fetchInsertMsg, fetchListMsg,
} from "@/api/msgBoard";
import { initialPreviousComment } from "@/reducer/article/comments";
import { IAppState, IThunkAction } from "@/store";
import { IPageInfo } from "@/define/common";
import { FORM_MSG } from "../form";
import { MSG_PAGE_SIZE } from "../pageSize";
import {
  DELETE_MSG_RESPONSE,
  IDeleteMsgResponseAction,
  IInsertMsgResponseAction,
  IListMsgResponseAction, INSERT_MSG_RESPONSE,
  ISetMsgLoadingAction,
  ISetPreviousMsgAction, LIST_MSG_RESPONSE,
  SET_MSG_LOADING,
  SET_PREVIOUS_MSG,
} from "@/action/msgBoard";
import { IMsg } from "@/define/msgBoard";

export function setMsgLoading(loading: boolean): ISetMsgLoadingAction {
  return {
    type: SET_MSG_LOADING,
    loading,
  };
}

export function setPreviousMsg(msg: IMsg): ISetPreviousMsgAction {
  return {
    type: SET_PREVIOUS_MSG,
    msg,
  };
}

function listMsgResponse(page: IPageInfo<IMsg>): IListMsgResponseAction {
  return {
    type: LIST_MSG_RESPONSE,
    page,
  };
}

export function listMsg(pageNum: number, pageSize: number = MSG_PAGE_SIZE): IThunkAction {
  return async (dispatch) => {
    dispatch(setMsgLoading(true));

    const result = await fetchListMsg(pageNum, pageSize);
    dispatch(setMsgLoading(false));
    dispatch(listMsgResponse(result.entity));
  };
}

function modifyMsg<T = null>(
  fetchFunc: (getState: () => IAppState) => Promise<IApiResult<T>>,
  successMsg: string,
  msgResponseActionCreator: (result: T) => Action<any>,
): IThunkAction {
  return async (dispatch, getState) => {
    dispatch(startSubmit(FORM_MSG));

    const result = await fetchFunc(getState);
    dispatch(setPreviousMsg(initialPreviousComment));
    dispatch(stopSubmit(FORM_MSG, result.errors));

    if (result.code === ApiResultCode.OK) {
      message.success(successMsg);
      dispatch(msgResponseActionCreator(result.entity));

      // 重新加载大小为 pageNum*pageSize 的评论列表
      const { pageNum } = getState().msg.page;
      const pageSize = pageNum * MSG_PAGE_SIZE;

      dispatch(listMsg(1, pageSize));
    } else {
      message.error(result.message);
    }
  };
}

function insertMsgResponse(msg: IMsg): IInsertMsgResponseAction {
  return {
    type: INSERT_MSG_RESPONSE,
    msg,
  };
}

export function insertMsg(msg: IMsg): IThunkAction {
  return modifyMsg<IMsg>(
    () => fetchInsertMsg(msg),
    "新增留言成功",
    insertMsgResponse,
  );
}

function deleteMsgResponse(): IDeleteMsgResponseAction {
  return {
    type: DELETE_MSG_RESPONSE,
  };
}

export function deleteMsg(id: number): IThunkAction {
  return modifyMsg(
    () => fetchDeleteMsg(id),
    "删除评论成功",
    deleteMsgResponse,
  );
}
