import { IApiResult } from "@/api";
import {
  fetchListArticles, fetchListArticlesByClassify,
} from "@/api/article";
import { IThunkAction } from "@/store";
import { IPageInfo } from "@/define/common";
import { ARTICLE_PAGE_SIZE } from "../pageSize";
import {
  IListArticlesByClassifyResponseAction,
  IListArticlesResponseAction,
  ISetArticlesLoadingAction,
  ISetClassifyArticlesLoadingAction, LIST_ARTICLES_BY_CLASSIFY_RESPONSE, LIST_ARTICLES_RESPONSE,
  SET_ARTICLES_LOADING, SET_CLASSIFY_ARTICLES_LOADING,
} from "@/action/article/articles";
import { IArticle, IClassifyWithArticles } from "@/define/article";

export function setArticlesLoading(loading: boolean): ISetArticlesLoadingAction {
  return {
    type: SET_ARTICLES_LOADING,
    loading,
  };
}

export function setClassifyArticlesLoading(loading: boolean): ISetClassifyArticlesLoadingAction {
  return {
    type: SET_CLASSIFY_ARTICLES_LOADING,
    loading,
  };
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
