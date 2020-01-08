import { IPageInfo } from "@/action/common";
import { IClassify } from "../classify";
import {
  ARTICLE_API_URL, httpDelete, httpGet, httpPost, httpPut, IApiResult, IBaseEntity,
} from "@/api";
import { IUser } from "../user";

export interface IArticle extends IBaseEntity {
  title: string;
  subTitle: string;
  content?: string;

  authorId: number;
  author?: IUser;

  classifyId: number;
  classify?: IClassify;

  createDate?: string;
  updateDate?: string;
}

export function fetchListArticles(pageNum: number, pageSize: number)
  : Promise<IApiResult<IPageInfo<IArticle>>> {
  return httpGet<IPageInfo<IArticle>>(`${ARTICLE_API_URL}/public/list/`, {
    pageNum, pageSize,
  });
}

export interface IClassifyWithArticles {
  articles: IPageInfo<IArticle>;
  classify: IClassify;
}

export function fetchListArticlesByClassify(
  classifyId: number,
  pageNum: number,
  pageSize: number,
): Promise<IApiResult<IClassifyWithArticles>> {
  return httpGet<IClassifyWithArticles>(`${ARTICLE_API_URL}/public/classify/${classifyId}/`, {
    pageNum, pageSize,
  });
}

export function fetchInsertArticle(article: IArticle): Promise<IApiResult<IArticle>> {
  return httpPost<IArticle>(`${ARTICLE_API_URL}/`, article);
}

export function fetchGetArticle(id: number): Promise<IApiResult<IArticle>> {
  return httpGet<IArticle>(`${ARTICLE_API_URL}/public/${id}`);
}

export function fetchUpdateArticle(article: IArticle): Promise<IApiResult<IArticle>> {
  return httpPut<IArticle>(`${ARTICLE_API_URL}/${article.id}`, article);
}

export function fetchDeleteArticle(id: number): Promise<IApiResult> {
  return httpDelete(`${ARTICLE_API_URL}/${id}`);
}
