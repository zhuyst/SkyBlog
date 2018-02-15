import {LOGIN_CLEAR, LOGIN_RESPONSE} from "../../action/common/LoginAction";
import {SET_LOGIN_USER, UPDATE_USER_INFO_RESPONSE} from "../../action/user/UsersAction";

const initialUser = {
    id: 0,
    username : "",
    nickname : "",
    admin : false
};

const initialState = {
    ok : null,
    message : null,
    user : initialUser
};

const LoginReducer = (state = initialState,action) => {
    console.log(action.type);

    switch (action.type){
        case LOGIN_CLEAR:{
            return {
                ...state,
                ok : null,
                user : initialUser
            }
        }
        case LOGIN_RESPONSE:{
            let ok = action.ok;
            let message = action.message;

            return {
                ...state,
                ok : ok,
                message : message
            }
        }

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

export default LoginReducer