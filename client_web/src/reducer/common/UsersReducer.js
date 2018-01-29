import {SET_LOGIN_USER, UPDATE_USER_INFO_RESPONSE} from "../../action/UsersAction";

const initialState = {
    user : null
};

const UserReducer = (state = initialState,action) =>{
    const { type,condition } = action;

    switch (type){
        case SET_LOGIN_USER:
            return {
                ...state,
                user : action.user
            };
        case UPDATE_USER_INFO_RESPONSE:
            return {
                ...state,
                user : condition.entity
            };
        default:
            return state;
    }
};

export default UserReducer;