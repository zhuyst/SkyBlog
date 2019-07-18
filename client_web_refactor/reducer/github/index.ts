import {
    GET_PROJECT_STAR_RESPONSE, GithubAction,
    IGetProjectStarResponseAction, IGithubCommit, IListCommitsResponseAction, ISetGithubLoadingAction,
    LIST_COMMITS_RESPONSE, SET_GITHUB_LOADING,
} from "../../action/github";

export interface IGithubState {
    commits: IGithubCommit[];
    star: number;
    loading: boolean;
}

const initialState: IGithubState = {
    commits : [],
    star : null,
    loading : true,
};

export default function githubReducer(state: IGithubState = initialState, action: GithubAction) {
    switch (action.type) {
        case SET_GITHUB_LOADING:
            return {
                ...state,
                loading : (action as ISetGithubLoadingAction).loading,
            };

        case LIST_COMMITS_RESPONSE:
            return {
                ...state,
                loading : false,
                commits : (action as IListCommitsResponseAction).commits,
            };

        case GET_PROJECT_STAR_RESPONSE:
            return {
                ...state,
                star : (action as IGetProjectStarResponseAction).star,
            };

        default:
            return state;
    }
}
