import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import './static/css/common/index.css';

const startApp = () => {
    ReactDOM.render(
        <App />
        , document.getElementById('root'));
    registerServiceWorker();
};

if(!window.cordova) {
    startApp()
} else {
    document.addEventListener('deviceready', startApp, false)
}
