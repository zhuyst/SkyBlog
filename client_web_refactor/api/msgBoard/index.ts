import { IPageInfo } from "@/define/common";
import {
  httpDelete, httpGet, httpPost, IApiResult, MSG_BOARD_API_URL,
} from "@/api";
import { IMsg } from "@/define/msgBoard";

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
