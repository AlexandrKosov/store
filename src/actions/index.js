import  GoodsStoreService from '../services/goodsstore-service';

const storeService = new GoodsStoreService();

const goodsRequested = () => {
  return {
    type: 'FETCH_GOODS_REQUEST'
  };
};

const goodsLoaded = (newGoods) => {
  return {
    type: 'FETCH_GOODS_SUCCESS',
    payload: newGoods
  };
};

const goodsError = (error) => {
  return {
    type: 'FETCH_GOODS_FAILURE',
    payload: error
  };
};

const getTotalCount = (total) => {
  return {
    type: 'GET_TOTAL_COUNT',
    payload: total
  }
};

export const fetchGoods = (sortBy=null, category=null, pagination) => async (dispatch) => {
	dispatch(goodsRequested());
	let query = '';
	let sort = '';
	let cat = '';
	let field = sortBy.field;
  let order = sortBy.order;
  let XTotalCount;// X-Total-Count - полное количество элементов без учета пагинации
  let page; 
  if(pagination){
    page = `_page=${pagination.page}&_limit=${pagination.limit}`;  
  }

	if(field && order){
		sort += `_sort=${field}&_order=${order}`
  }
  
	if(category!==undefined && category!==null && category+'') {
		cat = `categoryId=${category}`
	} 

  if(sort || cat) {
		query = '?';
		query += [cat, sort, page].join('&');
	}

  storeService.fetchAll(query)
    .then(data => {
      XTotalCount = data.headers.get('X-Total-Count');//получаем для пагинации полное количество элементов
      dispatch(getTotalCount(XTotalCount));
      return data
    })
    .then(data => data.json())
		.then((res)=> dispatch(goodsLoaded(res)))
  	.catch((err) => dispatch(goodsError(err)))

};
 
const catsRequested = () => {
  return {
    type: 'FETCH_CATS_REQUEST'
  };
};

const catsLoaded = (newCats) => {
  return {
    type: 'FETCH_CATS_SUCCESS',
    payload: newCats
  };
};

const catsError = (error) => {
  return {
    type: 'FETCH_CATS_FAILURE',
    payload: error
  };
}; 

export const fetchCats = () => async (dispatch) => {
	dispatch(catsRequested());
  
  storeService.fetchCats()
		.then(data => data.json())
		.then(data => dispatch(catsLoaded(data)))
    .catch((err) => dispatch(catsError(err)))  
}; 

export const setCategory = (catIndex) => ({
  type: 'SET_CATEGORY',
  payload: catIndex,
});

export const setSortBy = (newfilter) => {
	return {
    type: 'SET_SORT_BY',
    payload: newfilter,
  }
};

export const setItemsPerPage = (number) => {
  return {
    type: 'SET_ITEMS_PER_PAGE',
    payload: number
  }
};

export const setCurrentPage = (page) => {
  return {
    type: 'SET_CURRENT_PAGE',
    payload: page
  }
}

//  CART ------------------------------------

export const itemAddedToCart = (itemId) => {
  return {
    type: 'ITEM_ADDED_TO_CART',
    payload: itemId
  };
};

export const itemRemovedFromCart = (itemId) => {
  return {
    type: 'ITEM_REMOVED_FROM_CART',
    payload: itemId
  };
};

export const allItemsRemovedFromCart = (itemId) => {
  return {
    type: 'ALL_ITEMS_REMOVED_FROM_CART',
    payload: itemId
  };
};