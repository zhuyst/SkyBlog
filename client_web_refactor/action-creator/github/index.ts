import msg from "@/action-creator/common/notify";
import { FAIL_RESULT } from "@/api";
import {
  fetchCommits, fetchProjectStar,
} from "@/api/github";
import { IThunkAction } from "@/store";
import {
  GET_PROJECT_STAR_RESPONSE,
  IGetProjectStarResponseAction,
  IListCommitsResponseAction,
  ISetGithubLoadingAction,
  LIST_COMMITS_RESPONSE,
  SET_GITHUB_LOADING,
} from "@/action/github";
import { IGithubFullCommitInfo, IGithubInfo } from "@/define/github";

export function setGithubLoading(loading: boolean): ISetGithubLoadingAction {
  return {
    type: SET_GITHUB_LOADING,
    loading,
  };
}

function listCommitsResponse(commits: IGithubFullCommitInfo[]): IListCommitsResponseAction {
  return {
    type: LIST_COMMITS_RESPONSE,
    commits: commits.map((commit: IGithubFullCommitInfo) => ({
      sha: commit.sha,
      author: commit.author.login,
      authorUrl: commit.author.htmlUrl,
      message: commit.commit.message,
      commitUrl: commit.htmlUrl,
    })),
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

function getProjectStarResponse(result: IGithubInfo): IGetProjectStarResponseAction {
  return {
    type: GET_PROJECT_STAR_RESPONSE,
    star: result.stargazersCount,
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
