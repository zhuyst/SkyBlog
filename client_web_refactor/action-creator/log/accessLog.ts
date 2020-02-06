import {
  fetchGetAccessCount, fetchListAccessLog,
} from "@/api/accessLog";
import { IThunkAction } from "@/store";
import { AccessCount, IAccessLog } from "@/define/accessLog";
import { IPageInfo } from "@/define/common";
import {
  GET_ACCESS_COUNT_RESPONSE,
  IGetAccessCountResponseAction,
  IListAccessLogResponseAction, LIST_ACCESS_LOG_RESPONSE,
} from "@/action/log/accessLog";

function getAccessCountResponse(count: AccessCount): IGetAccessCountResponseAction {
  return {
    type: GET_ACCESS_COUNT_RESPONSE,
    count,
  };
}

export function getAccessCount(): IThunkAction<typeof GET_ACCESS_COUNT_RESPONSE> {
  return async (dispatch) => {
    const result = await fetchGetAccessCount();
    dispatch(getAccessCountResponse(result.entity));
  };
}

function listAccessLogResponse(page: IPageInfo<IAccessLog>): IListAccessLogResponseAction {
  return {
    type: LIST_ACCESS_LOG_RESPONSE,
    page,
  };
}

export function listAccessLog(pageNum: number, pageSize: number)
  : IThunkAction<typeof LIST_ACCESS_LOG_RESPONSE> {
  return async (dispatch) => {
    const result = await fetchListAccessLog(pageNum, pageSize);
    dispatch(listAccessLogResponse(result.entity));
  };
}
