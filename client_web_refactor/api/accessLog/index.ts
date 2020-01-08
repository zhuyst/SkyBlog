import { IPageInfo } from "@/action/common";
import { ACCESS_LOG_URL, httpGet, IApiResult } from "@/api";
import { IUser } from "../user";

export type AccessCount = number;

export function fetchGetAccessCount(): Promise<IApiResult<AccessCount>> {
  return httpGet<AccessCount>(`${ACCESS_LOG_URL}/public/total/`);
}

export interface IAccessLog {
  id: number;

  accessDate: string;
  ip: string;

  userId: number;
  user: IUser;
}

export function fetchListAccessLog(pageNum: number, pageSize: number)
  : Promise<IApiResult<IPageInfo<IAccessLog>>> {
  return httpGet<IPageInfo<IAccessLog>>(`${ACCESS_LOG_URL}/list/`, {
    pageNum, pageSize,
  });
}
