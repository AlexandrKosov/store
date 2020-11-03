import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const ShopHeader = () => {

  const value = useSelector(state => state.shoppingCart);
  const dispatch = useDispatch();

  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">BookStore</div>
      </Link>
	  <div className="">
	  </div>	
			
    <Link to="/cart">
      <div className="shopping-cart">
        <i className="cart-icon fa fa-shopping-cart" />
        &nbsp; {value.cartItems.length} items (&#8381;{value.orderTotal})
      </div>
    </Link>
    </header>
  );
};

export default ShopHeader;
