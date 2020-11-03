import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import 'antd/dist/antd.css';
import { Select } from 'antd';

//const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
const Pagination = ({active, itemsPerPage, totalItems, paginate, setItemsPerPage, setCurrentPage}) => {
  const dispatch = useDispatch();
  const pageNumbers = [];
  for(let i=1; i < Math.ceil(totalItems/itemsPerPage)+1;++i){
    pageNumbers.push(i);
  }

      // //console.log("start::",active, itemsPerPage, totalItems, pageNumbers.length);
      // console.log("active:", active, "<=", pageNumbers.length, "pageNumbers");

      // //этот код меняет активную страницу на последнюю в случае, если при смене количества товаров на странице, страница оказывается пустой
      // if(pageNumbers.length && active > pageNumbers.length){
      //   dispatch(setCurrentPage(pageNumbers.length)); 
      // }

  //----код для вывода ограниченного количества кнопок пагинации с многоточием--------------------------------------------------------
  let buttons = [];

  if(active > 5 && pageNumbers.length > 11 ){
    if(active < pageNumbers.length - 5){
      for(let i=1; i < 12; ++i){
        buttons.push({number:i + active - 6})
      }
    }else{  //active > pageNumbers.length - 5
      for(let i=11; i>0;--i){
        buttons.push({number: pageNumbers.length + 1 - i});// +1 из-за того, что отсчет страниц с 1-цы а не с нуля
      }
    }
  }else if(pageNumbers.length >= 11 && active <= 5 ){
    for(let i=1;i<12;++i){
      buttons.push({number: i});
    }
  }else if(pageNumbers.length < 11){//страниц пагинации меньше 11ти.
    for (let i=1;i<=pageNumbers.length;++i){
      buttons.push({number: i});
    }
  }
//----------------------------------------------------------------------


  return (
    <nav className="pagi">
      <ul className="pagination">
        {buttons.length > 1 && <li className={classNames("page-item",active===1?"active":"")} ><a onClick={()=>paginate(1)} className="page-link">Первый</a></li>}
        {active > 1 && (<li className="page-item"><a onClick={()=>paginate(active - 1)} className="page-link">пред</a></li>)}

        {pageNumbers.length > 11 && active > 6?(<span className="page-items-collapse">...</span>): null}

        {buttons.length > 1 && buttons.map(item => (
          <li key={item.number} className={classNames("page-item",item.number===active?"active":"")} >
            <a onClick={()=>paginate(item.number)} className="page-link">
              {item.number}
            </a>
          </li>
        ))}

      {pageNumbers.length > 11 && active < pageNumbers.length - 5?(<span className="page-items-collapse">...</span>):''}

        {active<=(pageNumbers.length-1) && (<li className="page-item"><a onClick={()=>paginate(active+1)} className="page-link">След</a></li>)}
        {buttons.length > 1 && <li className={classNames("page-item",(active===pageNumbers.length)?"active":"")}><a onClick={()=>paginate(pageNumbers.length)} className="page-link">Посл</a></li>}
      </ul>
      <div className="pagination-per-page">  
        <Select defaultValue={itemsPerPage} style={{ width: 120 }} onChange={setItemsPerPage}>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="4">4</Select.Option>
          <Select.Option value="8">8</Select.Option>
          <Select.Option value="12">12</Select.Option>
          <Select.Option value="16">16</Select.Option>
          <Select.Option value="20">20</Select.Option>
        </Select>
      </div>
    </nav>
  );
};

export default Pagination;

/*-------------

Use _page and optionally _limit to paginate returned data.

In the Link header you'll get first, prev, next and last links.

GET /posts?_page=7
GET /posts?_page=7&_limit=20
X-Total-Count
------------*/