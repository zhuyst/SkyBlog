import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import aboutReducer from "./about";
import loginReducer from "./common/login";

export default combineReducers({
    form : formReducer,
    about: aboutReducer,
    login: loginReducer,
});
