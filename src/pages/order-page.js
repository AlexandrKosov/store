import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

const OrderPage = () => {
    const {cartItems: items, orderTotal: total } = useSelector(state => state.shoppingCart);
    const renderRow = (item, idx) => {
        const { id, name, count, total } = item;
        return (
          <tr key={id}>
            <td>{idx + 1}</td>
            <td>{name}</td>
            <td>{count}</td>
            <td>₽{total}</td>
          </tr>
        );
      };

    return (
        items.length ? (
            <div className="shopping-cart-table">
            <h2>Ваш заказ</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th>Количество</th>
                  <th>Цена</th>
                </tr>
              </thead>
      
              <tbody>
              { items.map(renderRow) }
              </tbody>
            </table>
      
            <h4 className="total" style={{textAlign:'right'}}>
              Total: ₽{total}
            </h4>
            <h4 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    font: '400 24px/1 verdata, Tahoma, arial'
                }}>
                Ваш заказ уже готовится
            </h4>
          </div>
        ):(<Redirect to="/" />)
    )
    
};

export default OrderPage;