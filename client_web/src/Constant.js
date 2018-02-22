export const FORM_LOGIN = "login";
export const FORM_REGISTER = "register";
export const FORM_USERINFO = "userInfo";
export const FORM_ARTICLE = "article";
export const FORM_COMMENT = "comment";
export const FORM_CLASSIFY = "classify";
export const FORM_ABOUT = "about";
export const FORM_MSG = "msg";

export const COMMENT_PAGE_SIZE = 10;
export const ARTICLE_PAGE_SIZE = 5;
export const MSG_PAGE_SIZE = 20;
export const USER_PAGE_SIZE = 10;

export const UserRole = {
    SYS_ADMIN : {
        id : 1,
        name : "系统管理员"
    },
    ADMIN : {
        id : 2,
        name : "管理员"
    },
    VISITOR : {
        id : 3,
        name : "访客"
    }
};