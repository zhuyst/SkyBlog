import {_get, _put, ABOUT_API_URL} from "../../Api";
import {push} from 'react-router-redux'
import {error, success} from "../common/NotifyAction";

export const SET_ABOUT = "SET_ABOUT";
export const GET_ABOUT_RESPONSE = "GET_ABOUT_RESPONSE";
export const UPDATE_ABOUT_RESPONSE = "UPDATE_ABOUT_RESPONSE";

export const setAbout = about => {
    return {
        type : SET_ABOUT,
        about : about
    }
};

export const getAbout = about => dispatch => {
    const url = ABOUT_API_URL + "/public/";
    return _get(url,about)
        .then(result => dispatch(getAboutResponse(result)))
};

const getAboutResponse = result => {
    return {
        type : GET_ABOUT_RESPONSE,
        about : result.entity
    }
};

export const updateAbout = (about,back) => dispatch => {
    const url = ABOUT_API_URL + "/";
    return _put(url,about)
        .then(result => {
            if(result.code === 200){
                dispatch(success("更新关于成功"));
                dispatch(updateAboutResponse(result));
                if(back){
                    dispatch(push("/about"))
                }
            }
            else {
                dispatch(error(result.message))
            }
        })
};

const updateAboutResponse = result => {
    return {
        type : UPDATE_ABOUT_RESPONSE,
        about : result.entity
    }
};