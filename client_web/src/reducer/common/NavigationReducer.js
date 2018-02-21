import {SET_LOGIN_MODAL_SHOW,SET_REGISTER_MODAL_SHOW,SET_USERINFO_MODAL_SHOW} from '../../action/common/ModalAction'

const initialState = {
    modal : {
        loginModal_show : false,
        registerModal_show : false,
        userInfoModal_show : false
    }
};

const NavigationReducer = (state = initialState,action) => {
    let modal = state.modal;

    switch (action.type){
        case SET_LOGIN_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    loginModal_show: action.loginModal_show
                }
            };

        case SET_REGISTER_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    registerModal_show: action.registerModal_show
                }
            };

        case SET_USERINFO_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    userInfoModal_show : action.userInfoModal_show
                }
            };

        default :
            return state
    }
};

export default NavigationReducer