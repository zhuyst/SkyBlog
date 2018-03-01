import {checkStatus, FAIL_RESULT, HttpMethod} from "../../Api";
import {error} from "../common/NotifyAction";

export const SET_GITHUB_LOADING = "SET_GITHUB_LOADING";
export const LIST_COMMITS_RESPONSE = "LIST_COMMITS_RESPONSE";

export const setGithubLoading = loading => {
    return {
        type : SET_GITHUB_LOADING,
        loading : loading
    }
};

export const listCommits = per_page => dispatch => {
    dispatch(setGithubLoading(true));

    const url = `https://api.github.com/repos/zhuyst/SkyBlog/commits?per_page=${per_page}`;
    return fetch(url,{
        method : HttpMethod.GET,
        headers : {
            Accept: "application/vnd.github.v3+json"
        }
    }).then(response => checkStatus(response))
        .then(result => {
            dispatch(setGithubLoading(false));
            dispatch(listCommitsResponse(result))
        })
        .catch(() => dispatch(error(FAIL_RESULT.message)));
};

const listCommitsResponse = commits => {
    let list = [];
    commits.forEach(commit => {
        list.push({
            sha : commit.sha,
            author : commit.author.login,
            author_url : commit.author.html_url,
            message : commit.commit.message,
            commit_url : commit.html_url
        })
    });

    return {
        type : LIST_COMMITS_RESPONSE,
        commits : list
    }
};