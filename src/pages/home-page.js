import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods, fetchCats, setCategory, setSortBy, setItemsPerPage, setCurrentPage } from '../actions';

import Filter from '../components/filter';
import ItemList from '../components/item-list';
import Categories from '../components/categories';
import Pagination from '../components/pagination';
import Spinner from '../components/spinner';
import ErrorIndicator from '../components/error-indicator';

import 'antd/dist/antd.css';
import '../../node_modules/antd/dist/antd.css';
import { Select } from 'antd';

const HomePage = () => {
	
const dispatch = useDispatch();
const { goods, loading, error, total, itemsPerPage, currentPage } = useSelector(state => state.goods);
const cats = useSelector(state => state.categories);
const filter = useSelector(state => state.filters);


  React.useEffect(() => {
	let category = cats.activeCategory;
    dispatch(fetchGoods(filter, cats.activeCategory, {page: currentPage, limit:itemsPerPage}));
  }, [filter.field, filter.order,cats.activeCategory, currentPage, itemsPerPage]);
  
  
  React.useEffect(() => {
	dispatch(fetchCats());
  },[]);	
  
  
  const onSelectCategory = React.useCallback((index) => {
		dispatch(setCurrentPage(1))
    dispatch(setCategory(index));
  }, []);

	const handleChangeSortBy = React.useCallback((sortField) => {
		let newfilter = {...filter, field:sortField};
		dispatch(setSortBy(newfilter));
	}, [filter.field]);
	
	const handleChangeOrder = React.useCallback((sortOrder) => {
		let newfilter = {...filter, order:sortOrder};
		dispatch(setSortBy(newfilter));
	}, [filter.order]);
	
	const paginate = React.useCallback((pageNumber) => {
		dispatch(setCurrentPage(pageNumber))
	});

	const changeItemsPerPage = React.useCallback((value) => {
		dispatch(setCurrentPage(1));
		dispatch(setItemsPerPage(value))
	});

  return (
    <div className="content">
		<div className="header-content">
			<Categories categories={cats} onSelectCategory={onSelectCategory} activeCategory={cats.activeCategory}/>
			<Filter onChangeSortBy={handleChangeSortBy} onChangeOrder={handleChangeOrder}/>
		</div>
		<ItemList />
		<Pagination active={currentPage} itemsPerPage={itemsPerPage} totalItems={total} paginate={paginate} setItemsPerPage={changeItemsPerPage} setCurrentPage={setCurrentPage}/>
	</div>
  );
};

export default HomePage;
