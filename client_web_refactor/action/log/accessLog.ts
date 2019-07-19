import {Action} from "redux";
import {AccessCount, fetchGetAccessCount, fetchListAccessLog, IAccessLog} from "../../api/accessLog";
import {IPageInfo, IThunkAction} from "../common";

export const GET_ACCESS_COUNT_RESPONSE = "GET_ACCESS_COUNT_RESPONSE";
export interface IGetAccessCountResponseAction extends Action<typeof GET_ACCESS_COUNT_RESPONSE> {
    count: AccessCount;
}
function getAccessCountResponse(count: AccessCount): IGetAccessCountResponseAction {
    return {
        type : GET_ACCESS_COUNT_RESPONSE,
        count,
    };
}

export function getAccessCount(): IThunkAction<typeof GET_ACCESS_COUNT_RESPONSE> {
    return async (dispatch) => {
        const result = await fetchGetAccessCount();
        dispatch(getAccessCountResponse(result.entity));
    };
}

export const LIST_ACCESS_LOG_RESPONSE = "LIST_ACCESS_LOG_RESPONSE";
export interface IListAccessLogResponseAction extends Action<typeof LIST_ACCESS_LOG_RESPONSE> {
    page: IPageInfo<IAccessLog>;
}
function listAccessLogResponse(page: IPageInfo<IAccessLog>): IListAccessLogResponseAction {
    return {
        type : LIST_ACCESS_LOG_RESPONSE,
        page,
    };
}

export function listAccessLog(pageNum: number, pageSize: number): IThunkAction<typeof LIST_ACCESS_LOG_RESPONSE> {
    return async (dispatch) => {
        const result = await fetchListAccessLog(pageNum, pageSize);
        dispatch(listAccessLogResponse(result.entity));
    };
}
