import { IPageInfo } from "@/define/common";
import { LIST_SYS_LOG_RESPONSE, SysLogAction } from "@/action/log/sysLog";
import { SYS_LOG_PAGE_SIZE } from "@/action-creator/pageSize";
import { ISysLog } from "@/define/sysLog";

export type ISysLogState = IPageInfo<ISysLog>;

const initialState: ISysLogState = {
  list: [],
  pageNum: 1,
  pageSize: SYS_LOG_PAGE_SIZE,
  pages: 0,
  total: 0,
};

export default function sysLogReducer(
  state: ISysLogState = initialState,
  action: SysLogAction,
): ISysLogState {
  switch (action.type) {
    case LIST_SYS_LOG_RESPONSE:
      return { ...state, ...action.page };

    default:
      return state;
  }
}
