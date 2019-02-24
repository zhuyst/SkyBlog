import React from 'react';
import { ConnectedRouter as Router } from 'react-router-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import { Provider } from 'react-redux';

import Index from './component/common/Index';
import store, { history } from './store/Store';

// store.subscribe(() => {
//     // 监听state变化
//     console.log(store.getState())
// });

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <NotificationsSystem theme={theme} />
          <Router history={history}>
            <Index />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
