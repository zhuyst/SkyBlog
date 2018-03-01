import {LIST_COMMITS_RESPONSE, SET_GITHUB_LOADING} from "../../action/github/GithubAction";

const initialState = {
    commits : [],
    loading : true
};

const GithubReducer = (state = initialState,action) => {
    switch (action.type){
        case SET_GITHUB_LOADING:
            return {
                ...state,
                loading : action.loading
            };

        case LIST_COMMITS_RESPONSE:
            return {
                ...state,
                loading : false,
                commits : action.commits
            };
        default:
            return state
    }
};

export default GithubReducer
