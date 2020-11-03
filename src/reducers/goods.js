const updateGoodsList = (state, action) => {

  if (state === undefined) {
    return {
      goods: [],
      loading: true,
      error: null,
      total: null,
      itemsPerPage: 8,
      currentPage: 1
    };
  }

  switch (action.type) {
    case 'FETCH_GOODS_REQUEST':
      return {
        goods: [],
        loading: true,
        error: null,
        total: state.goods.total,
        itemsPerPage: state.goods.itemsPerPage,
        currentPage: state.goods.currentPage
      };

    case 'FETCH_GOODS_SUCCESS':
      return {
        goods: action.payload,
        loading: false,
        error: null,
        total: state.goods.total,
        itemsPerPage: state.goods.itemsPerPage,
        currentPage: state.goods.currentPage
      };

    case 'FETCH_GOODS_FAILURE':
      return {
        goods: [],
        loading: false,
        error: action.payload,
        total: state.goods.total,
        itemsPerPage: state.goods.itemsPerPage,
        currentPage: state.goods.currentPage
      };
      
    case 'GET_TOTAL_COUNT':
      return {
        goods: [...state.goods.goods],
        loading: false,
        error: null,
        total: action.payload,
        itemsPerPage: state.goods.itemsPerPage,
        currentPage: state.goods.currentPage
      };

    case 'SET_ITEMS_PER_PAGE':
      return {
      goods: [...state.goods.goods],
        loading: false,
        error: null,
        total: state.goods.total,
        itemsPerPage: action.payload,
        currentPage: state.goods.currentPage       
      }
     
    case 'SET_CURRENT_PAGE':
    return {
      goods: [...state.goods.goods],
        loading: false,
        error: null,
        total: state.goods.total,
        itemsPerPage: state.goods.itemsPerPage,        
        currentPage: action.payload
    }

    default:
      return state.goods;
  }
};

export default updateGoodsList;
