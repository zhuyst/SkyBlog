import { Action } from "redux";
import { IPageInfo } from "@/define/common";
import { AccessCount, IAccessLog } from "@/define/accessLog";

export const GET_ACCESS_COUNT_RESPONSE = "GET_ACCESS_COUNT_RESPONSE";
export interface IGetAccessCountResponseAction extends Action<typeof GET_ACCESS_COUNT_RESPONSE> {
  count: AccessCount;
}

export const LIST_ACCESS_LOG_RESPONSE = "LIST_ACCESS_LOG_RESPONSE";
export interface IListAccessLogResponseAction extends Action<typeof LIST_ACCESS_LOG_RESPONSE> {
  page: IPageInfo<IAccessLog>;
}

export type AccessLogAction = IGetAccessCountResponseAction | IListAccessLogResponseAction;
