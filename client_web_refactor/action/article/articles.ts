import { Action } from "redux";
import {
  IArticle, IClassifyWithArticles,
} from "@/define/article";
import { IPageInfo } from "@/define/common";

export const SET_ARTICLES_LOADING = "SET_ARTICLES_LOADING";
export interface ISetArticlesLoadingAction extends Action<typeof SET_ARTICLES_LOADING> {
  loading: boolean;
}

export const SET_CLASSIFY_ARTICLES_LOADING = "SET_CLASSIFY_ARTICLES_LOADING";
export interface ISetClassifyArticlesLoadingAction
  extends Action<typeof SET_CLASSIFY_ARTICLES_LOADING> {
  loading: boolean;
}

export const LIST_ARTICLES_RESPONSE = "LIST_ARTICLES_RESPONSE";
export interface IListArticlesResponseAction extends Action<typeof LIST_ARTICLES_RESPONSE> {
  page: IPageInfo<IArticle>;
}

export const LIST_ARTICLES_BY_CLASSIFY_RESPONSE = "LIST_ARTICLES_BY_CLASSIFY_RESPONSE";
export interface IListArticlesByClassifyResponseAction
  extends Action<typeof LIST_ARTICLES_BY_CLASSIFY_RESPONSE> {
  vo: IClassifyWithArticles;
}

export type ArticlesAction = ISetArticlesLoadingAction | ISetClassifyArticlesLoadingAction |
IListArticlesResponseAction | IListArticlesByClassifyResponseAction;
