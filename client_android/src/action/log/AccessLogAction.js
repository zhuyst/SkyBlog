import {_get, ACCESS_LOG_URL} from "../../Api";

export const GET_ACCESS_COUNT_RESPONSE = "GET_ACCESS_COUNT_RESPONSE";
export const LIST_ACCESS_LOG_RESPONSE = "LIST_ACCESS_LOG_RESPONSE";

export const getAccessCount = () => dispatch => {
    return _get(ACCESS_LOG_URL + "/public/total/")
        .then(result => dispatch(getAccessCountResponse(result.entity)))
};

const getAccessCountResponse = count => {
    return {
        type : GET_ACCESS_COUNT_RESPONSE,
        count : count
    }
};

export const listAccessLog = (pageNum,pageSize) => dispatch => {
    return _get(ACCESS_LOG_URL + "/list/",{
        pageNum : pageNum,
        pageSize : pageSize
    }).then(result => dispatch(listAccessLogResponse(result.entity)))
};

const listAccessLogResponse = page => {
    return {
        type : LIST_ACCESS_LOG_RESPONSE,
        page : page
    }
};
