import {
  GET_PROJECT_STAR_RESPONSE, GithubAction,
  IGithubCommit, LIST_COMMITS_RESPONSE, SET_GITHUB_LOADING,
} from "../../action/github";

export interface IGithubState {
  commits: IGithubCommit[];
  star: number;
  loading: boolean;
}

const initialState: IGithubState = {
  commits: [],
  star: null,
  loading: true,
};

export default function githubReducer(state: IGithubState = initialState, action: GithubAction): IGithubState {
  switch (action.type) {
    case SET_GITHUB_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case LIST_COMMITS_RESPONSE:
      return {
        ...state,
        loading: false,
        commits: action.commits,
      };

    case GET_PROJECT_STAR_RESPONSE:
      return {
        ...state,
        star: action.star,
      };

    default:
      return state;
  }
}
