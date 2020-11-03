import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  itemAddedToCart,
  itemRemovedFromCart,
  allItemsRemovedFromCart } from '../../actions';

const ShoppingCartTable = () => {

  const {cartItems: items, orderTotal: total } = useSelector(state => state.shoppingCart);

  const dispatch = useDispatch();
  
  
  const onIncrease = React.useCallback((index) => {
    dispatch(itemAddedToCart(index));
  }, []);
  const onDecrease = React.useCallback((index) => {
    dispatch(itemRemovedFromCart(index));
  }, []);
  const onDelete = React.useCallback((index) => {
    dispatch(allItemsRemovedFromCart(index));
  }, []);



  const renderRow = (item, idx) => {
    const { id, name, count, total } = item;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{name}</td>
        <td>{count}</td>
        <td>₽{total}</td>
        <td>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o" />
          </button>
          <button
             onClick={() => onIncrease(id)}
            className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle" />
          </button>
          <button
            onClick={() => onDecrease(id)}
            className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  const cart = (items) => {
    return items.length ? (
      <div className="shopping-cart-table">
        <h2>Ваш заказ</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Количество</th>
              <th>Цена</th>
              <th></th>
            </tr>
          </thead>
  
          <tbody>
          { items.map(renderRow) }
          </tbody>
        </table>
  
        <h4 className="total" style={{textAlign:'right'}}>
          Total: ₽{total}
        </h4>
        <div>
          <Link to="/order">
            <div className="shopping-cart">
              <i className="cart-icon fa fa-shopping-cart" />
              &nbsp; Перейти к оформлению заказа
            </div>
          </Link>
        </div>
      </div>
    ):(<div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      font: '400 24px/1 verdata, Tahoma, arial'
    }}>Корзина пуста</div>)
  };

return cart(items)
}

export default ShoppingCartTable;
