import {SET_LOGIN_MODEL_SHOW,SET_REGISTER_MODEL_SHOW,SET_USERINFO_MODEL_SHOW} from '../../action/common/ModelAction'

const initialState = {
    model : {
        loginModel_show : false,
        registerModel_show : false,
        userInfoModel_show : false
    }
};

const NavigationReducer = (state = initialState,action) => {
    let model = state.model;

    switch (action.type){
        case SET_LOGIN_MODEL_SHOW:
            return {
                ...state,
                model : {
                    ...model,
                    loginModel_show: action.loginModel_show
                }
            };

        case SET_REGISTER_MODEL_SHOW:
            return {
                ...state,
                model : {
                    ...model,
                    registerModel_show: action.registerModel_show
                }
            };

        case SET_USERINFO_MODEL_SHOW:
            return {
                ...state,
                model : {
                    ...model,
                    userInfoModel_show : action.userInfoModel_show
                }
            };

        default :
            return state
    }
};

export default NavigationReducer