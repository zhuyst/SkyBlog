import {
    SET_ACCESS_LOG_MODAL_SHOW,
    SET_LOGIN_MODAL_SHOW, SET_REGISTER_MODAL_SHOW, SET_SYS_LOG_MODAL_SHOW, SET_USER_MANAGEMENT_MODAL_SHOW,
    SET_USERINFO_MODAL_SHOW
} from '../../action/common/ModalAction'

const initialState = {
    modal : {
        loginModal_show : false,
        registerModal_show : false,
        userInfoModal_show : false,
        userManagementModal_show : false,
        sysLogModal_show : false,
        accessLogModal_show : false
    }
};

const NavigationReducer = (state = initialState,action) => {
    const show = action.show;
    let modal = state.modal;

    switch (action.type){
        case SET_LOGIN_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    loginModal_show: show
                }
            };

        case SET_REGISTER_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    registerModal_show: show
                }
            };

        case SET_USERINFO_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    userInfoModal_show : show
                }
            };

        case SET_USER_MANAGEMENT_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    userManagementModal_show : show
                }
            };

        case SET_SYS_LOG_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    sysLogModal_show: show
                }
            };

        case SET_ACCESS_LOG_MODAL_SHOW:
            return {
                ...state,
                modal : {
                    ...modal,
                    accessLogModal_show: show
                }
            };

        default :
            return state
    }
};

export default NavigationReducer