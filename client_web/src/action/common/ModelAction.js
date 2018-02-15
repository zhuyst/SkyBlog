export const SET_LOGIN_MODEL_SHOW = "SET_LOGIN_MODEL_SHOW";
export const SET_REGISTER_MODEL_SHOW = "SET_REGISTER_MODEL_SHOW";
export const SET_USERINFO_MODEL_SHOW = "SET_USERINFO_MODEL_SHOW";

export const setLoginModelShow = loginModel_show =>{
    return {
        type : SET_LOGIN_MODEL_SHOW,
        loginModel_show : loginModel_show
    }
};

export const setRegisterModelShow = registerModel_show => {
    return {
        type : SET_REGISTER_MODEL_SHOW,
        registerModel_show : registerModel_show
    }
};

export const setUserInfoModelShow = userInfoModel_show => {
    return {
        type : SET_USERINFO_MODEL_SHOW,
        userInfoModel_show : userInfoModel_show
    }
};