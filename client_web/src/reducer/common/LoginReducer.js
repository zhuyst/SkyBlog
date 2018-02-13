import {LOGIN_CLEAR, LOGIN_RESPONSE} from "../../action/common/ModelAction";
import {SET_LOGIN_USER, UPDATE_USER_INFO_RESPONSE} from "../../action/UsersAction";

const initialUser = {
    id: 0,
    username : "",
    nickname : "",
    admin : false
};

const initialState = {
    login_state : {
        ok : null,
        message : null
    },
    user : initialUser
};

const LoginReducer = (state = initialState,action) => {
    const {type,result} = action;

    switch (type){
        case LOGIN_CLEAR:{
            return {
                ...state,
                login_state : {
                    ok : null
                },
                user : initialUser
            }
        }
        case LOGIN_RESPONSE:{
            let login_state = {
                ok : false,
                message : null
            };

            if(result.code === 200){
                login_state.ok = true;
            }
            else if(result.code === 403){
                login_state.ok = null;
            }
            else {
                login_state.ok = false;
                login_state.message = result.message
            }

            return {
                ...state,
                login_state : login_state
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