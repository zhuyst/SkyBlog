import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as notificationsReducer } from 'reapop';

import ArticlesReducer from './article/ArticlesReducer';
import NavigationReducer from './common/NavigationReducer';
import ContentReducer from './article/ContentReducer';
import UploadReducer from './article/UploadReducer';
import LoginReducer from './common/LoginReducer';
import UsersReducer from './user/UsersReducer';
import ClassifyReducer from './article/ClassifyReducer';
import AboutReducer from './about/AboutReducer';
import MsgBoardReducer from './msgboard/MsgBoardReducer';
import GithubReducer from './github/GithubReducer';
import SysLogReducer from './log/SysLogReducer';
import AccessLogReducer from './log/AccessLogReducer';

const AppReducer = combineReducers({
  navigation: NavigationReducer,
  articles: ArticlesReducer,
  content: ContentReducer,
  upload: UploadReducer,
  login: LoginReducer,
  users: UsersReducer,
  classify: ClassifyReducer,
  about: AboutReducer,
  msg: MsgBoardReducer,
  github: GithubReducer,
  sys_log: SysLogReducer,
  access_log: AccessLogReducer,
  form: formReducer,
  router: routerReducer,
  notifications: notificationsReducer(),
});

export default AppReducer;
