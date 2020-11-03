const updateFilters = (state, action) => {

  if (state === undefined) {
    return {
      field: 'price',
	  order: 'asc'
    };
  };

  switch (action.type) {
	case 'SET_SORT_BY':
		return {
			field: action.payload.field,
			order: action.payload.order
		}

    default:
      return state.filters;
  }
};

export default updateFilters;
