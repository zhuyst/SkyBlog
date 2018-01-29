import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './static/css/common/index.css';

import App from './App';
import store from './store/Store'

import registerServiceWorker from './registerServiceWorker';

store.subscribe(() => {
    //监听state变化
    console.log(store.getState())
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
