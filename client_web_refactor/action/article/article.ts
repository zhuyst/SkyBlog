import { message as msg } from "antd";
import { useRouter } from "next/router";
import { Action } from "redux";
import { change, startSubmit, stopSubmit } from "redux-form";
import { ApiResultCode, IApiResult } from "../../api";
import {
  fetchDeleteArticle, fetchGetArticle, fetchInsertArticle, fetchUpdateArticle, IArticle,
} from "../../api/article";
import { IThunkAction } from "../../store";
import { FORM_ARTICLE, FORM_COMMENT } from "../form";
import { ARTICLE_PAGE_SIZE, COMMENT_PAGE_SIZE } from "../pageSize";
import { listArticles } from "./articles";
import { listClassify } from "./classify";
import { listComments } from "./comment";

interface IArticleAction<T> extends Action<T> {
  article: IArticle;
}

export const SET_ARTICLE = "SET_ARTICLE";
export interface ISetArticleAction extends IArticleAction<typeof SET_ARTICLE> {}
export function setArticle(article: IArticle): ISetArticleAction {
  return {
    type: SET_ARTICLE,
    article,
  };
}

export const SET_ARTICLE_LOADING = "SET_ARTICLE_LOADING";
export interface ISetArticleLoadingAction extends Action<typeof SET_ARTICLE_LOADING> {
  loading: boolean;
}
export function setArticleLoading(loading: boolean): ISetArticleLoadingAction {
  return {
    type: SET_ARTICLE_LOADING,
    loading,
  };
}

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export interface IInsertArticleResponseAction extends IArticleAction<typeof INSERT_ARTICLE_RESPONSE> {}
function insertArticleResponse(article: IArticle): IInsertArticleResponseAction {
  return {
    type: INSERT_ARTICLE_RESPONSE,
    article,
  };
}

export function insertArticle(article: IArticle, back: boolean): IThunkAction {
  return modifyArticle<IArticle>(
    () => fetchInsertArticle(article),
    "发布文章成功",
    insertArticleResponse,
    async (result) => {
      let url = `/article/content/${result.entity.id}`;
      if (back) {
        url += "/justify";
      } else {
        url += "/edit";
      }
      const router = useRouter();
      await router.replace(url);
    },
  );
}

export function getArticleInfo(id: number): IThunkAction {
  return async (dispatch) => {
    const result = await fetchGetArticle(id);
    dispatch(getArticleInfoResponse(result.entity));

    const article = result.entity;
    dispatch(change(FORM_COMMENT, "articleId", id));
    dispatch(listComments(id, 1, COMMENT_PAGE_SIZE));

    document.title = `${article.title} - 博客文章 - 青云的小窝`;
  };
}

export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";
export interface IGetArticleInfoResponseAction extends IArticleAction<typeof GET_ARTICLE_INFO_RESPONSE> {}
function getArticleInfoResponse(article: IArticle): IGetArticleInfoResponseAction {
  return {
    type: GET_ARTICLE_INFO_RESPONSE,
    article,
  };
}

export function updateArticle(article: IArticle, back: boolean): IThunkAction {
  return modifyArticle<IArticle>(
    () => fetchUpdateArticle(article),
    "更新文章成功",
    updateArticleResponse,
    async (result) => {
      if (back) {
        const router = useRouter();
        await router.replace(`/article/content/${result.entity.id}/justify`);
      }
    },
  );
}

export const UPDATE_ARTICLE_RESPONSE = "UPDATE_ARTICLE_RESPONSE";
export interface IUpdateArticleResponseAction extends IArticleAction<typeof UPDATE_ARTICLE_RESPONSE> {}
function updateArticleResponse(article: IArticle): IUpdateArticleResponseAction {
  return {
    type: UPDATE_ARTICLE_RESPONSE,
    article,
  };
}

export function deleteArticle(id: number): IThunkAction {
  return modifyArticle(
    () => fetchDeleteArticle(id),
    "删除文章成功",
    deleteArticleResponse,
    async () => {
      const router = useRouter();
      await router.replace("/article");
    },
  );
}

export const DELETE_ARTICLE_RESPONSE = "DELETE_ARTICLE_RESPONSE";
export interface IDeleteArticleResponseAction extends Action<typeof DELETE_ARTICLE_RESPONSE> {
  result: IApiResult;
}
function deleteArticleResponse(result: IApiResult): IDeleteArticleResponseAction {
  return {
    type: DELETE_ARTICLE_RESPONSE,
    result,
  };
}

function modifyArticle<T = null>(
  fetchFunc: () => Promise<IApiResult<T>>,
  successMsg: string,
  articleResponseActionCreator: (result: T) => Action<any>,
  extraSuccessFunc?: (result: IApiResult<T>) => Promise<any>,
): IThunkAction {
  return async (dispatch) => {
    dispatch(startSubmit(FORM_ARTICLE));

    const result = await fetchFunc();
    dispatch(stopSubmit(FORM_ARTICLE, result.errors));

    if (result.code === ApiResultCode.OK) {
      msg.success(successMsg);
      dispatch(articleResponseActionCreator(result.entity));

      dispatch(listArticles(1, ARTICLE_PAGE_SIZE));
      dispatch(listClassify());

      await extraSuccessFunc(result);
    } else {
      msg.error(result.message);
    }
  };
}

export type ArticleAction = ISetArticleAction | IGetArticleInfoResponseAction |
IInsertArticleResponseAction | IUpdateArticleResponseAction | ISetArticleLoadingAction;
