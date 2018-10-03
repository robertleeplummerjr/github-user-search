import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(combineReducers(App.reducer));

  ReactDOM.render(
    <Provider store={ store }>
      <App callbackName="updateData" />
    </Provider>, div);
});
