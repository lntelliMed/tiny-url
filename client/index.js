import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import shortenUrlReducer from './store/reducers/shortenUrl';
import App from './App';

const rootReducer = combineReducers({
  shortenUrl: shortenUrlReducer
});

const store = createStore(rootReducer, applyMiddleware(logger(), thunk));

const app = (
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

