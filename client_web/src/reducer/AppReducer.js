import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'reapop';

import ArticlesReducer from './article/ArticlesReducer'
import NavigationReducer from './common/NavigationReducer'
import ContentReducer from "./article/ContentReducer";
import LoginReducer from './common/LoginReducer'
import UserReducer from './common/UsersReducer'
import ClassifyReducer from './article/ClassifyReducer'

const AppReducer = combineReducers({
    navigation : NavigationReducer,
    articles : ArticlesReducer,
    article : ContentReducer,
    login : LoginReducer,
    user : UserReducer,
    classify : ClassifyReducer,
    form : formReducer,
    router: routerReducer,
    notifications: notificationsReducer()
});

export default AppReducer