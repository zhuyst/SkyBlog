import { Action } from "redux";

export const SET_GITHUB_LOADING = "SET_GITHUB_LOADING";
export interface ISetGithubLoadingAction extends Action<typeof SET_GITHUB_LOADING> {
  loading: boolean;
}

export interface IGithubCommit {
  sha: string;
  author: string;
  authorUrl: string;
  message: string;
  commitUrl: string;
}

export const LIST_COMMITS_RESPONSE = "LIST_COMMITS_RESPONSE";
export interface IListCommitsResponseAction extends Action<typeof LIST_COMMITS_RESPONSE> {
  commits: IGithubCommit[];
}

export const GET_PROJECT_STAR_RESPONSE = "GET_PROJECT_STAR_RESPONSE";
export interface IGetProjectStarResponseAction extends Action<typeof GET_PROJECT_STAR_RESPONSE> {
  star: number;
}

export type GithubAction =
  ISetGithubLoadingAction |
  IListCommitsResponseAction |
  IGetProjectStarResponseAction;
