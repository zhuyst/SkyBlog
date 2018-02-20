import {
    DELETE_CLASSIFY_RESPONSE, INSERT_CLASSIFY_RESPONSE,
    LIST_CLASSIFY_RESPONSE, SET_CLASSIFY_SHOW, UPDATE_CLASSIFY_RESPONSE
} from "../../action/article/ClassifyAction";

const initialState = {
    list : [],
    show : false
};

const ClassifyReducer = (state = initialState,action) => {
    switch(action.type){
        case LIST_CLASSIFY_RESPONSE:
            return {
                ...state,
                list : action.list
            };
        case INSERT_CLASSIFY_RESPONSE:
            return {
                ...state,
                list : action.list
            };
        case DELETE_CLASSIFY_RESPONSE:
            return {
                ...state,
                list : action.list
            };
        case UPDATE_CLASSIFY_RESPONSE:
            return {
                ...state,
                list : action.list
            };
        case SET_CLASSIFY_SHOW:
            return {
                ...state,
                show : action.show
            };
        default:
            return state;
    }
};

export default ClassifyReducer