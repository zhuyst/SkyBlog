import { message as msg } from "antd";
import { Action } from "redux";
import { FAIL_RESULT } from "../../api";
import {
  fetchCommits, fetchProjectStar, IGithubFullCommitInfo, IGithubInfo,
} from "../../api/github";
import { IThunkAction } from "../../store";

export const SET_GITHUB_LOADING = "SET_GITHUB_LOADING";
export interface ISetGithubLoadingAction extends Action<typeof SET_GITHUB_LOADING> {
  loading: boolean;
}
export function setGithubLoading(loading: boolean): ISetGithubLoadingAction {
  return {
    type: SET_GITHUB_LOADING,
    loading,
  };
}

export function listCommits(perPage: number): IThunkAction {
  return async (dispatch) => {
    dispatch(setGithubLoading(true));

    try {
      const result = await fetchCommits(perPage);
      dispatch(setGithubLoading(false));
      dispatch(listCommitsResponse(result));
    } catch (e) {
      msg.error(FAIL_RESULT.message);
    }
  };
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
function listCommitsResponse(commits: IGithubFullCommitInfo[]): IListCommitsResponseAction {
  return {
    type: LIST_COMMITS_RESPONSE,
    commits: commits.map((commit: IGithubFullCommitInfo) => ({
      sha: commit.sha,
      author: commit.author.login,
      authorUrl: commit.author.html_url,
      message: commit.commit.message,
      commitUrl: commit.html_url,
    })),
  };
}

export function getProjectStar(): IThunkAction<typeof GET_PROJECT_STAR_RESPONSE> {
  return async (dispatch) => {
    try {
      const result = await fetchProjectStar();
      dispatch(getProjectStarResponse(result));
    } catch (e) {
      msg.error(FAIL_RESULT.message);
    }
  };
}

export const GET_PROJECT_STAR_RESPONSE = "GET_PROJECT_STAR_RESPONSE";
export interface IGetProjectStarResponseAction extends Action<typeof GET_PROJECT_STAR_RESPONSE> {
  star: number;
}
function getProjectStarResponse(result: IGithubInfo): IGetProjectStarResponseAction {
  return {
    type: GET_PROJECT_STAR_RESPONSE,
    star: result.stargazers_count,
  };
}

export type GithubAction = ISetGithubLoadingAction | IListCommitsResponseAction | IGetProjectStarResponseAction;
