import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import aboutReducer from "./about";
import loginReducer from "./common/login";
import modalReducer from "./common/modal";
import githubReducer from "./github";

export default combineReducers({
    form : formReducer,
    about: aboutReducer,
    login: loginReducer,
    modal: modalReducer,
    github: githubReducer,
});
