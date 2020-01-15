import { Action } from "redux";
import { IApiResult } from "@/api";
import {
  fetchListArticles, fetchListArticlesByClassify, IArticle, IClassifyWithArticles,
} from "@/api/article";
import { IThunkAction } from "@/store";
import { IPageInfo } from "../common";
import { ARTICLE_PAGE_SIZE } from "../pageSize";

export const SET_ARTICLES_LOADING = "SET_ARTICLES_LOADING";
export interface ISetArticlesLoadingAction extends Action<typeof SET_ARTICLES_LOADING> {
  loading: boolean;
}
export function setArticlesLoading(loading: boolean): ISetArticlesLoadingAction {
  return {
    type: SET_ARTICLES_LOADING,
    loading,
  };
}

export const SET_CLASSIFY_ARTICLES_LOADING = "SET_CLASSIFY_ARTICLES_LOADING";
export interface ISetClassifyArticlesLoadingAction
  extends Action<typeof SET_CLASSIFY_ARTICLES_LOADING> {
  loading: boolean;
}
export function setClassifyArticlesLoading(loading: boolean): ISetClassifyArticlesLoadingAction {
  return {
    type: SET_CLASSIFY_ARTICLES_LOADING,
    loading,
  };
}

export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export interface IListArticlesResponseAction extends Action<typeof LIST_ARTICLES_RESPONSE> {
  page: IPageInfo<IArticle>;
}
function listArticlesResponse(result: IApiResult<IPageInfo<IArticle>>)
  : IListArticlesResponseAction {
  return {
    type: LIST_ARTICLES_RESPONSE,
    page: result.entity,
  };
}

export function listArticles(pageNum: number, pageSize: number = ARTICLE_PAGE_SIZE): IThunkAction {
  return async (dispatch) => {
    dispatch(setArticlesLoading(true));

    const result = await fetchListArticles(
      pageNum, pageSize,
    );
    dispatch(setArticlesLoading(false));
    dispatch(listArticlesResponse(result));
  };
}

export const LIST_ARTICLES_BY_CLASSIFY_RESPONSE = "LIST_ARTICLES_BY_CLASSIFY_RESPONSE";
export interface IListArticlesByClassifyResponseAction
  extends Action<typeof LIST_ARTICLES_BY_CLASSIFY_RESPONSE> {
  vo: IClassifyWithArticles;
}
function listArticlesByClassifyResponse(result: IApiResult<IClassifyWithArticles>):
IListArticlesByClassifyResponseAction {
  return {
    type: LIST_ARTICLES_BY_CLASSIFY_RESPONSE,
    vo: result.entity,
  };
}

export function listArticlesByClassify(
  classifyId: number,
  pageNum: number,
  pageSize: number = ARTICLE_PAGE_SIZE,
): IThunkAction {
  return async (dispatch) => {
    dispatch(setClassifyArticlesLoading(true));

    const result = await fetchListArticlesByClassify(classifyId, pageNum, pageSize);
    dispatch(setClassifyArticlesLoading(false));
    dispatch(listArticlesByClassifyResponse(result));
  };
}

export type ArticlesAction = ISetArticlesLoadingAction | ISetClassifyArticlesLoadingAction |
IListArticlesResponseAction | IListArticlesByClassifyResponseAction;
