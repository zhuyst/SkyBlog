import {SET_LOGIN_USER, UPDATE_USER_INFO_RESPONSE} from "../../action/UsersAction";

const initialState = {
    user : {
        id: 0,
        username : "",
        nickname : ""
    }
};

const UserReducer = (state = initialState,action) =>{
    switch (action.type){
        case SET_LOGIN_USER:
            return {
                ...state,
                user : action.user
            };
        case UPDATE_USER_INFO_RESPONSE:
            return {
                ...state,
                user : action.user
            };
        default:
            return state;
    }
};

export default UserReducer;