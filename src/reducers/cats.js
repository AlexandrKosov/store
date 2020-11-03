const updateCatsList = (state, action) => {

  if (state === undefined) {
    return {
      categories: [],
      loading: true,
      error: null,
	    activeCategory: null
    };
  }

  switch (action.type) {
    case 'FETCH_CATS_REQUEST':
      return {
        categories: [],
        loading: true,
        error: null,
		    activeCategory: null
      };

    case 'FETCH_CATS_SUCCESS':
      return {
        categories: action.payload,
        loading: false,
        error: null,
		    activeCategory: null
      };

    case 'FETCH_CATS_FAILURE':
      return {
        categories: [],
        loading: false,
        error: action.payload,
		    activeCategory: null
      };
	
	case 'SET_CATEGORY':
		return {
        categories: [...state.categories.categories],
        loading: false,
        error: null,
		    activeCategory: action.payload			
		} 
	
    default:
      return state.categories;
  }
};

export default updateCatsList;
