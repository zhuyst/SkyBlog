import {reducer as notificationsReducer} from "reapop";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    form : formReducer,
    notifications: notificationsReducer(),
});
