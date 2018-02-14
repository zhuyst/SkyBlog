import {_get, CLASSIFY_API_URL} from "../../Api";

export const LIST_CLASSIFY_RESPONSE = "LIST_CLASSIFY_RESPONSE";
export const INSERT_CLASSIFY_RESPONSE = "INSERT_CLASSIFY_RESPONSE";
export const DELETE_CLASSIFY_RESPONSE = "DELETE_CLASSIFY_RESPONSE";

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