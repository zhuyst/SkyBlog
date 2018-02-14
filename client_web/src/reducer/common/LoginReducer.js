import {LOGIN_CLEAR, LOGIN_RESPONSE} from "../../action/common/ModelAction";
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
    const {type,result} = action;

    switch (type){
        case LOGIN_CLEAR:{
            return {
                ...state,
                ok : null,
                user : initialUser
            }
        }
        case LOGIN_RESPONSE:{
            let ok = false;
            let message = null;

            if(result.code === 200){
                ok = true;
            }
            else if(result.code === 403){
                ok = null;
            }
            else {
                ok = false;
                message = result.message
            }

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