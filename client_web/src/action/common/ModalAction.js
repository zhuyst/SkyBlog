export const SET_LOGIN_MODAL_SHOW = "SET_LOGIN_MODAL_SHOW";
export const SET_REGISTER_MODAL_SHOW = "SET_REGISTER_MODAL_SHOW";
export const SET_USERINFO_MODAL_SHOW = "SET_USERINFO_MODAL_SHOW";

export const setLoginModalShow = loginModal_show =>{
    return {
        type : SET_LOGIN_MODAL_SHOW,
        loginModal_show : loginModal_show
    }
};

export const setRegisterModalShow = registerModal_show => {
    return {
        type : SET_REGISTER_MODAL_SHOW,
        registerModal_show : registerModal_show
    }
};

export const setUserInfoModalShow = userInfoModal_show => {
    return {
        type : SET_USERINFO_MODAL_SHOW,
        userInfoModal_show : userInfoModal_show
    }
};