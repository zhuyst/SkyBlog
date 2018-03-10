import {GET_ACCESS_COUNT_RESPONSE, LIST_ACCESS_LOG_RESPONSE} from "../../action/log/AccessLogAction";

const initialState = {
    count : null,
    page : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0
    }
};

export const AccessLogReducer = (state = initialState,action) => {
    switch (action.type){

        case GET_ACCESS_COUNT_RESPONSE:
            return {
                ...state,
                count : action.count
            };

        case LIST_ACCESS_LOG_RESPONSE:
            return {
                ...state,
                page : action.page
            };

        default:
            return state;
    }
};

export default AccessLogReducer;