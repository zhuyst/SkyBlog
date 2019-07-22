import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import aboutReducer from "./about";
import articlesReducer from "./article/articles";
import classifyReducer from "./article/classify";
import loginReducer from "./common/login";
import modalReducer from "./common/modal";
import githubReducer from "./github";
import accessLogReducer from "./log/accessLog";
import sysLogReducer from "./log/sysLog";
import userReducer from "./user";

export default combineReducers({
    form : formReducer,
    about: aboutReducer,
    login: loginReducer,
    modal: modalReducer,
    github: githubReducer,
    articles: articlesReducer,
    classify: classifyReducer,
    accessLog: accessLogReducer,
    sysLog: sysLogReducer,
    user: userReducer,
});
