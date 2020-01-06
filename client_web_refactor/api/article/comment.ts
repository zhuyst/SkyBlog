import { IPageInfo } from "@/action/common";
import {
  ARTICLE_API_URL, httpDelete, httpGet, httpPost, IApiResult, IBaseEntity,
} from "@/api";
import { IUser } from "../user";

export interface IComment extends IBaseEntity {
  content: string;
  authorId?: number;
  author?: IUser;
}

export function fetchInsertComment(articleId: number, comment: IComment): Promise<IApiResult<IComment>> {
  return httpPost(`${ARTICLE_API_URL}/${articleId}/comment/`, comment);
}

export function fetchListComments(id: number, pageNum: number, pageSize: number):
Promise<IApiResult<IPageInfo<IComment>>> {
  return httpGet<IPageInfo<IComment>>(`${ARTICLE_API_URL}/public/${id}/comment/`, {
    pageNum, pageSize,
  });
}

export function fetchDeleteComments(id: number): Promise<IApiResult> {
  return httpDelete(`${ARTICLE_API_URL}/comment/${id}`);
}
