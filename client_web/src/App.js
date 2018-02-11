import React from 'react';
import Index from './component/common/Index'
import store from "./store/Store";
import { Provider } from 'react-redux'

store.subscribe(() => {
    // 监听state变化
    console.log(store.getState())
});

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    );
  }
}

export default App;
