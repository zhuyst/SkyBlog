import { IPageInfo } from "@/define/common";
import { AccessLogAction, GET_ACCESS_COUNT_RESPONSE, LIST_ACCESS_LOG_RESPONSE } from "@/action/log/accessLog";
import { ACCESS_LOG_PAGE_SIZE } from "@/action-creator/pageSize";
import { AccessCount, IAccessLog } from "@/define/accessLog";

export interface IAccessLogState {
  count: AccessCount;
  page: IPageInfo<IAccessLog>;
}

const initialState: IAccessLogState = {
  count: 0,
  page: {
    list: [],
    pageNum: 1,
    pageSize: ACCESS_LOG_PAGE_SIZE,
    pages: 0,
    total: 0,
  },
};

export default function accessLogReducer(
  state: IAccessLogState = initialState,
  action: AccessLogAction,
): IAccessLogState {
  switch (action.type) {
    case GET_ACCESS_COUNT_RESPONSE:
      return {
        ...state,
        count: action.count,
      };

    case LIST_ACCESS_LOG_RESPONSE:
      return {
        ...state,
        page: action.page,
      };

    default:
      return state;
  }
}
