import { Action } from "redux";
import { IArticle } from "@/define/article";

interface IArticleAction<T> extends Action<T> {
  article: IArticle;
}

export const SET_ARTICLE = "SET_ARTICLE";
export interface ISetArticleAction extends IArticleAction<typeof SET_ARTICLE> {}

export const SET_ARTICLE_LOADING = "SET_ARTICLE_LOADING";
export interface ISetArticleLoadingAction extends Action<typeof SET_ARTICLE_LOADING> {
  loading: boolean;
}

export const INSERT_ARTICLE_RESPONSE = "INSERT_ARTICLE_RESPONSE";
export interface IInsertArticleResponseAction
  extends IArticleAction<typeof INSERT_ARTICLE_RESPONSE> {}

export const GET_ARTICLE_INFO_RESPONSE = "GET_ARTICLE_INFO_RESPONSE";
export interface IGetArticleInfoResponseAction
  extends IArticleAction<typeof GET_ARTICLE_INFO_RESPONSE> {}

export const UPDATE_ARTICLE_RESPONSE = "UPDATE_ARTICLE_RESPONSE";
export interface IUpdateArticleResponseAction
  extends IArticleAction<typeof UPDATE_ARTICLE_RESPONSE> {}

export const DELETE_ARTICLE_RESPONSE = "DELETE_ARTICLE_RESPONSE";
export interface IDeleteArticleResponseAction extends Action<typeof DELETE_ARTICLE_RESPONSE> {}

export type ArticleAction = ISetArticleAction | IGetArticleInfoResponseAction |
IInsertArticleResponseAction | IUpdateArticleResponseAction | ISetArticleLoadingAction;
