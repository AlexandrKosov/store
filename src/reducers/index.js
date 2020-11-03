import updateGoodsList  from './goods';
import updateCatsList  from './cats';
import updateFilters  from './filters';
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {
  return {
	  goods: updateGoodsList(state,action),
	  categories: updateCatsList(state,action),
	  filters: updateFilters(state,action),
	  shoppingCart: updateShoppingCart(state, action)

  };
};

export default reducer;
