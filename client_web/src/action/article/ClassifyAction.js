import {_delete, _get, _post, CLASSIFY_API_URL} from "../../Api";
import {error, success} from "../common/NotifyAction";

export const SET_CLASSIFY_SHOW = "SET_CLASSIFY_SHOW";
export const LIST_CLASSIFY_RESPONSE = "LIST_CLASSIFY_RESPONSE";
export const INSERT_CLASSIFY_RESPONSE = "INSERT_CLASSIFY_RESPONSE";
export const DELETE_CLASSIFY_RESPONSE = "DELETE_CLASSIFY_RESPONSE";

export const setClassifyShow = show => {
    return {
        type : SET_CLASSIFY_SHOW,
        show : show
    }
};

export const listClassify = () => dispatch => {
    const url = CLASSIFY_API_URL + "/public/";
    return _get(url)
        .then(result => dispatch(listClassifyResponse(result)))
};

const listClassifyResponse = result => {
    return {
        type : LIST_CLASSIFY_RESPONSE,
        list : result.entity
    }
};

export const insertClassify = classify => dispatch => {
    const url = CLASSIFY_API_URL + "/";
    return _post(url,classify)
        .then(result => {
            if(result.code === 200){
                dispatch(success("新增文章分类成功"));
                dispatch(insertClassifyResponse(result));
                dispatch(setClassifyShow(false))
            }
            else {
                dispatch(error(result.message));
            }
        })
};

const insertClassifyResponse = result => {
    return {
        type : INSERT_CLASSIFY_RESPONSE,
        list : result.entity
    }
};

export const deleteClassify = id => dispatch => {
    const url = CLASSIFY_API_URL + `/${id}`;
    return _delete(url)
        .then(result => {
            if(result.code === 200){
                dispatch(success("删除文章分类成功"));
                dispatch(deleteClassifyResponse(result))
            }
            else {
                dispatch(error(result.message));
            }
        })
};

const deleteClassifyResponse = result => {
    return {
        type : DELETE_CLASSIFY_RESPONSE,
        list : result.entity
    }
};