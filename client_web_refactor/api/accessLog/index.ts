import { IPageInfo } from "@/define/common";
import { ACCESS_LOG_URL, httpGet, IApiResult } from "@/api";
import { AccessCount, IAccessLog } from "@/define/accessLog";

export function fetchGetAccessCount(): Promise<IApiResult<AccessCount>> {
  return httpGet<AccessCount>(`${ACCESS_LOG_URL}/public/total/`);
}

export function fetchListAccessLog(pageNum: number, pageSize: number)
  : Promise<IApiResult<IPageInfo<IAccessLog>>> {
  return httpGet<IPageInfo<IAccessLog>>(`${ACCESS_LOG_URL}/list/`, {
    pageNum, pageSize,
  });
}
