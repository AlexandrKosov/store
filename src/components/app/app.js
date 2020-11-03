import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ShopHeader from '~c/shop-header';
import { HomePage, CartPage, OrderPage } from '../../pages';

import './app.less';

const App = () => {

	
  return (
    <main role="main" className="container">
	 <ShopHeader />
      <Switch>
        <Route
          path="/"
          component={HomePage}
          exact />

        <Route
          path="/cart"
          component={CartPage}
          />
        <Route
          path="/order"
          component={OrderPage}
          />  
	</Switch>{/**/}
    </main>
  );
};

export default App;