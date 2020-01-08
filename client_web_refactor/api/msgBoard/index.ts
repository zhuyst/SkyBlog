import { IPageInfo } from "@/action/common";
import { IComment } from "../article/comment";
import {
  httpDelete, httpGet, httpPost, IApiResult, MSG_BOARD_API_URL,
} from "@/api";

export type IMsg = IComment;

export function fetchInsertMsg(msg: IMsg): Promise<IApiResult<IMsg>> {
  return httpPost<IMsg>(`${MSG_BOARD_API_URL}/`, msg);
}

export function fetchListMsg(pageNum: number, pageSize: number)
  : Promise<IApiResult<IPageInfo<IMsg>>> {
  return httpGet<IPageInfo<IMsg>>(`${MSG_BOARD_API_URL}/public/list/`, {
    pageNum, pageSize,
  });
}

export function fetchDeleteMsg(id: number): Promise<IApiResult> {
  return httpDelete(`${MSG_BOARD_API_URL}/${id}`);
}
