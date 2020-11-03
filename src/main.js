import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';

import GoodsStoreService from './services/goodsstore-service';

import store from './store';
const goodsStoreService = new GoodsStoreService();

ReactDOM.render(
   <Provider store={store}>
    <ErrorBoundry>
        <Router>
          <App />
        </Router>
    </ErrorBoundry>
   </Provider>
  ,
  document.getElementById('app')
);