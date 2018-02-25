import {LIST_COMMITS_RESPONSE} from "../../action/github/GithubAction";

const initialState = {
    commits : []
};

const GithubReducer = (state = initialState,action) => {
    switch (action.type){
        case LIST_COMMITS_RESPONSE:
            return {
                ...state,
                commits : action.commits
            };
        default:
            return state
    }
};

export default GithubReducer
