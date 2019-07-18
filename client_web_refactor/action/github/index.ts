import { message as msg } from "antd";
import {Action, Dispatch} from "redux";
import {FAIL_RESULT} from "../../api";
import {fetchCommits, fetchProjectStar, IGithubCommit, IGithubInfo} from "../../api/github";

export const SET_GITHUB_LOADING = "SET_GITHUB_LOADING";
export interface ISetGithubLoadingAction extends Action<typeof SET_GITHUB_LOADING> {
    loading: boolean;
}
export function setGithubLoading(loading: boolean): ISetGithubLoadingAction {
    return {
        type : SET_GITHUB_LOADING,
        loading,
    };
}

export function listCommits(perPage: number) {
    return async (dispatch: Dispatch<any>) => {
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

export const LIST_COMMITS_RESPONSE = "LIST_COMMITS_RESPONSE";
export interface IListCommitsAction extends Action<typeof LIST_COMMITS_RESPONSE> {
    commits: Array<{
        sha: string;
        author: string;
        author_url: string;
        message: string;
        commit_url: string;
    }>;
}
function listCommitsResponse(commits: IGithubCommit[]): IListCommitsAction {
    return {
        type : LIST_COMMITS_RESPONSE,
        commits : commits.map((commit: IGithubCommit) => {
            return {
                sha : commit.sha,
                author : commit.author.login,
                author_url : commit.author.html_url,
                message : commit.commit.message,
                commit_url : commit.html_url,
            };
        }),
    };
}

export function getProjectStar() {
    return async (dispatch: Dispatch<any>) => {
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
        type : GET_PROJECT_STAR_RESPONSE,
        star : result.stargazers_count,
    };
}
