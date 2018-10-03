import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(combineReducers(App.reducer));

window.updateData = function(payload) {
  store.dispatch(App.actions.setSearchData(payload.data));
};

ReactDOM.render(
  <Provider store={ store }>
    <App callbackName="updateData" />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
