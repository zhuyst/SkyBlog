import {LOGIN_CLEAR, LOGIN_RESPONSE, SET_MANAGEMENT,SET_LOGIN_USER} from "../../action/common/LoginAction";
import {UPDATE_USER_INFO_RESPONSE} from "../../action/user/UsersAction";

const initialUser = {
    id: 0,
    username : "",
    nickname : "",
    admin : false
};

const initialState = {
    ok : null,
    message : null,
    management : false,
    user : initialUser
};

const LoginReducer = (state = initialState,action) => {
    console.log(action.type);

    switch (action.type){
        case SET_MANAGEMENT:{
            return {
                ...state,
                management: action.management
            }
        }

        case LOGIN_CLEAR:{
            return {
                ...state,
                ok : null,
                user : initialUser,
                management: false
            }
        }

        case LOGIN_RESPONSE:{
            let ok = action.ok;
            let message = action.message;

            return {
                ...state,
                ok : ok,
                message : message,
                management: false
            }
        }

        case SET_LOGIN_USER:
            const user = action.user;
            let management = user.admin;

            return {
                ...state,
                user : user,
                management: management
            };

        case UPDATE_USER_INFO_RESPONSE:
            return {
                ...state,
                user : action.user,
                management: false
            };

        default:
            return state;
    }
};

export default LoginReducer