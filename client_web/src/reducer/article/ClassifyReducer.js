import {LIST_CLASSIFY_RESPONSE} from "../../action/article/ClassifyAction";

const initialState = {
    list : []
};

const ClassifyReducer = (state = initialState,action) => {
    switch(action.type){
        case LIST_CLASSIFY_RESPONSE:
            return {
                ...state,
                list : action.list
            };
        default:
            return state;
    }
};

export default ClassifyReducer