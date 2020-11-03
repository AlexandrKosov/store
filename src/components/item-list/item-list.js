import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { itemAddedToCart } from '../../actions';

const ItemList = ({}) => {
  
  const { goods, loading, error } = useSelector(state => state.goods);
	const dispatch = useDispatch();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorIndicator />;
  }
  
  return (
    <div className="items-list">
		{!loading && goods.map((item)=>{
			let img = item.image?(<img src={`/assets/images/goods/${item.image}`} className="item__image" />): (<div className="item__fakeimage"></div>)
			return (
			<div className="item" key={item.id}>
				{img}
				<h6 className="item__title">{item.name}</h6>
				<p className="item__description">{item.description}</p>
				<h6 className="item__price">Цена: {item.price} </h6>
				<button className="add-to-cart" onClick={() => {dispatch(itemAddedToCart(item.id))}}>В корзину</button>
			</div>
			)
		})}
		</div>
  );
};

export default ItemList;

