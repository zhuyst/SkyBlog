import {LOGIN_CLEAR, LOGIN_RESPONSE} from "../../action/common/ModelAction";

const initialState = {
    login_state : {
        ok : null,
        message : null
    },
};

const LoginReducer = (state = initialState,action) => {
    const {type,condition} = action;

    switch (type){
        case LOGIN_CLEAR:{
            return {
                ...state,
                login_state : {
                    ok : null
                }
            }
        }
        case LOGIN_RESPONSE:{
            let login_state = {
                ok : false,
                message : null
            };

            if(condition.code === 200){
                login_state.ok = true;
            }
            else {
                login_state.ok = false;
                login_state.message = condition.message
            }

            return {
                ...state,
                login_state : login_state
            }
        }
        default:
            return state;
    }
};

export default LoginReducer