import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'reapop';

import ArticlesReducer from './article/ArticlesReducer'
import NavigationReducer from './common/NavigationReducer'
import ContentReducer from "./article/ContentReducer";
import LoginReducer from './common/LoginReducer'
import UserReducer from './user/UsersReducer'
import ClassifyReducer from './article/ClassifyReducer'
import AboutReducer from './about/AboutReducer'
import MsgBoardReducer from './msgboard/MsgBoardReducer'

const AppReducer = combineReducers({
    navigation : NavigationReducer,
    articles : ArticlesReducer,
    content : ContentReducer,
    login : LoginReducer,
    user : UserReducer,
    classify : ClassifyReducer,
    about : AboutReducer,
    msg : MsgBoardReducer,
    form : formReducer,
    router: routerReducer,
    notifications: notificationsReducer()
});

export default AppReducer