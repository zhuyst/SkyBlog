import {message} from "antd";
import {Action} from "redux";
import {startSubmit, stopSubmit} from "redux-form";
import {ApiResultCode, IApiResult} from "../../api";
import {fetchDeleteMsg, fetchInsertMsg, fetchListMsg, IMsg} from "../../api/msgBoard";
import {initialPreviousComment} from "../../reducer/article/ContentReducer";
import {IAppState} from "../../store";
import {IPageInfo, IThunkAction} from "../common";
import {FORM_MSG} from "../form";
import {MSG_PAGE_SIZE} from "../pageSize";

interface IMsgAction<T> extends Action<T> {
    msg: IMsg;
}

export const SET_MSG_LOADING = "SET_MSG_LOADING";
export interface ISetMsgLoadingAction extends Action<typeof SET_MSG_LOADING> {
    loading: boolean;
}
export function setMsgLoading(loading: boolean): ISetMsgLoadingAction {
    return {
        type : SET_MSG_LOADING,
        loading,
    };
}

export const SET_PREVIOUS_MSG = "SET_PREVIOUS_MSG";
export interface ISetPreviousMsgAction extends IMsgAction<typeof SET_PREVIOUS_MSG> {}
export function setPreviousMsg(msg: IMsg): ISetPreviousMsgAction {
    return {
        type : SET_PREVIOUS_MSG,
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

export const INSERT_MSG_RESPONSE = "INSERT_MSG_RESPONSE";
export interface IInsertMsgResponseAction extends IMsgAction<typeof INSERT_MSG_RESPONSE> {}
function insertMsgResponse(msg: IMsg): IInsertMsgResponseAction {
    return {
        type : INSERT_MSG_RESPONSE,
        msg,
    };
}

export function listMsg(pageNum: number, pageSize: number): IThunkAction {
    return async (dispatch) => {
        dispatch(setMsgLoading(true));

        const result = await fetchListMsg(pageNum, pageSize);
        dispatch(setMsgLoading(false));
        dispatch(listMsgResponse(result.entity));
    };
}

export const LIST_MSG_RESPONSE = "LIST_MSG_RESPONSE";
export interface IListMsgResponseAction extends Action<typeof LIST_MSG_RESPONSE> {
    page: IPageInfo<IMsg>;
}
function listMsgResponse(page: IPageInfo<IMsg>): IListMsgResponseAction {
    return {
        type : LIST_MSG_RESPONSE,
        page,
    };
}

export function deleteMsg(id: number): IThunkAction {
    return modifyMsg(
        () => fetchDeleteMsg(id),
        "删除评论成功",
        deleteMsgResponse,
    );
}

export const DELETE_MSG_RESPONSE = "DELETE_MSG_RESPONSE";
export interface IDeleteMsgResponseAction extends Action<typeof DELETE_MSG_RESPONSE> {
    result: IApiResult;
}
function deleteMsgResponse(result: IApiResult): IDeleteMsgResponseAction {
    return {
        type : DELETE_MSG_RESPONSE,
        result,
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
            const pageNum = getState().msg.page.pageNum;
            const pageSize = pageNum * MSG_PAGE_SIZE;

            dispatch(listMsg(1, pageSize));
        } else {
            message.error(result.message);
        }
    };
}
