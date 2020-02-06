import { IPageInfo } from "@/define/common";
import {
  httpGet, IApiResult, SYS_LOG_URL,
} from "@/api";
import { ISysLog } from "@/define/sysLog";

export function fetchListSysLog(pageNum: number, pageSize: number)
  : Promise<IApiResult<IPageInfo<ISysLog>>> {
  return httpGet<IPageInfo<ISysLog>>(`${SYS_LOG_URL}/list/`, {
    pageNum, pageSize,
  });
}
