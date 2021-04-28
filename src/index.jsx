import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'app/service-worker';
import App from 'app/App';

import { Provider } from 'react-redux';
import store from 'app/store/reducer';

const component = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(component, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
