export const SET_LOGIN_MODAL_SHOW = "SET_LOGIN_MODAL_SHOW";
export const SET_REGISTER_MODAL_SHOW = "SET_REGISTER_MODAL_SHOW";
export const SET_USERINFO_MODAL_SHOW = "SET_USERINFO_MODAL_SHOW";
export const SET_USER_MANAGEMENT_SHOW = "SET_USER_MANAGEMENT_SHOW";

export const setLoginModalShow = show =>{
    return {
        type : SET_LOGIN_MODAL_SHOW,
        show : show
    }
};

export const setRegisterModalShow = show => {
    return {
        type : SET_REGISTER_MODAL_SHOW,
        show : show
    }
};

export const setUserInfoModalShow = show => {
    return {
        type : SET_USERINFO_MODAL_SHOW,
        show : show
    }
};

export const setUserManagementShow = show => {
    return {
        type : SET_USER_MANAGEMENT_SHOW,
        show : show
    }
};