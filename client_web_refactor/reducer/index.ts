import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {reducer as notificationsReducer} from 'reapop';
import aboutReducer from "./about";
import articleReducer from "./article/article";
import articlesReducer from "./article/articles";
import classifyReducer from "./article/classify";
import commentsReducer from "./article/comments";
import uploadReducer from "./article/upload";
import loginReducer from "./common/login";
import modalReducer from "./common/modal";
import githubReducer from "./github";
import accessLogReducer from "./log/accessLog";
import sysLogReducer from "./log/sysLog";
import msgBoardReducer from "./msgBoard";
import userReducer from "./user";

export default combineReducers({
  form: formReducer,
  notifications: notificationsReducer(),

  about: aboutReducer,

  article: articleReducer,
  articles: articlesReducer,
  classify: classifyReducer,
  comments: commentsReducer,
  upload: uploadReducer,

  login: loginReducer,
  modal: modalReducer,

  github: githubReducer,

  accessLog: accessLogReducer,
  sysLog: sysLogReducer,

  user: userReducer,

  msgBoard: msgBoardReducer,
});
