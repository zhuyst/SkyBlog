import { Action } from "redux";
import { ISysLog } from "@/define/sysLog";
import { IPageInfo } from "@/define/common";

export const LIST_SYS_LOG_RESPONSE = "LIST_SYS_LOG_RESPONSE";
export interface IListSysLogResponseAction extends Action<typeof LIST_SYS_LOG_RESPONSE> {
  page: IPageInfo<ISysLog>;
}

export type SysLogAction = IListSysLogResponseAction;
