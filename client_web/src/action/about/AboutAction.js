import {_get, _post, ABOUT_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";

export const GET_ABOUT_RESPONSE = "GET_ABOUT_RESPONSE";
export const UPDATE_ABOUT_RESPONSE = "UPDATE_ABOUT_RESPONSE";

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

export const updateAbout = about => dispatch => {
    const url = ABOUT_API_URL + "/";
    return _post(url,about)
        .then(result => {
            if(result.code === 200){
                dispatch(success("更新关于成功"));
                dispatch(updateAboutResponse(result));
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