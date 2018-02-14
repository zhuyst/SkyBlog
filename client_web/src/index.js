import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './static/css/common/index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App />
    , document.getElementById('root'));
registerServiceWorker();
