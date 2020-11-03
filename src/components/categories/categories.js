import React from 'react';
import classNames from 'classnames';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const Categories = (props) => {
	const allCatsClasses = classNames("category",props.activeCategory===null?'active':'');

	if (props.categories.loading) {
    return <Spinner />;
  }

  if (props.categories.error) {
    return <ErrorIndicator />;
	}
	
  return (
    <div className="categories">
		
		<span className={allCatsClasses} onClick={()=>props.onSelectCategory(null)}>Все</span>
		{props.categories.categories && props.categories.categories.map((item) => {
			let cn;
			if(item.id===props.activeCategory){cn = 'active'} else {cn = null}
			return <span key={item.id} className={classNames("category",cn)} onClick={()=>props.onSelectCategory(item.id)}>{item.name}</span>
		})}
    </div>
  );
};

export default Categories;
