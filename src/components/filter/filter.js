import React from 'react';

import 'antd/dist/antd.css';
import { Select } from 'antd';


import { useSelector, useDispatch } from 'react-redux';



//const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
const Filter = (props) => {
	const filter = useSelector(state => state.filters);
  return (
    <div className="filter">
			<Select defaultValue={filter.field} style={{ width: 120 }} onChange={props.onChangeSortBy}>
				<Select.Option value="name">по имени</Select.Option>
				<Select.Option value="price">по цене</Select.Option>
			</Select>
			<Select defaultValue={filter.order} style={{ width: 150 }} onChange={props.onChangeOrder}>
				<Select.Option value="asc">по возрастанию</Select.Option>
				<Select.Option value="desc">по убыванию</Select.Option>
			</Select>
    </div>
  );
};

export default Filter;
