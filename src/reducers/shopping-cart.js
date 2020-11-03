
const updateShoppingCart = (state, action) => {
	
    if(state===undefined){
        return {
            cartItems: [],
            orderTotal: 0,
            currentItem: null
        }
    }
    
    switch(action.type) {
        case 'SELECT_CURRENT_ITEM':
            return {
                cartItems: state.shoppingCart.cartItems,
                orderTotal: state.shoppingCart.orderTotal,
                currentItem: action.payload
            }

        case 'ITEM_ADDED_TO_CART':
        const itemId = action.payload;
        
        const good = state.goods.goods.find(el=>el.id===itemId);
        const itemIndex = state.shoppingCart.cartItems.findIndex((el)=>el.id===itemId);
        const itemInCart = state.shoppingCart.cartItems[itemIndex];
        let newItem;
        if(itemInCart) {
            newItem = {
                ...itemInCart,
                count:itemInCart.count + 1,
                total:itemInCart.total + itemInCart.price
            }; 
        } else {
            newItem = {
                id:good.id,
                name:good.name,
                count:1,
                price: good.price,
                total:good.price
            };
        }

        if(itemIndex < 0){
            return {
                ...state.shoppingCart,
                orderTotal: state.shoppingCart.orderTotal + good.price,
                cartItems: [
                    ...state.shoppingCart.cartItems,
                    newItem
                ]
            }
        } else {
            return {
                ...state.shoppingCart,
                orderTotal: state.shoppingCart.orderTotal + itemInCart.price,
                cartItems: [
                    ...state.shoppingCart.cartItems.slice(0,itemIndex),
                    newItem,
                    ...state.shoppingCart.cartItems.slice(itemIndex + 1),
                ]
            }
        }

      case 'ITEM_REMOVED_FROM_CART':
      const deletingItemId = action.payload;
      const deletingItemIndex = state.shoppingCart.cartItems.findIndex((el)=>el.id===deletingItemId);
      const deletingItemInCart = state.shoppingCart.cartItems[deletingItemIndex];  
        if(deletingItemInCart.count>1){
            return {
                ...state.shoppingCart,
                orderTotal: state.shoppingCart.orderTotal - deletingItemInCart.price,
                cartItems: [
                    ...state.shoppingCart.cartItems.slice(0,deletingItemIndex),
                    {
                        ...deletingItemInCart,
                        count:deletingItemInCart.count - 1,
                        total:deletingItemInCart.total - deletingItemInCart.price
                    },
                    ...state.shoppingCart.cartItems.slice(deletingItemIndex + 1),
                ]
            }
        }else{
            return {
                ...state.shoppingCart,
                orderTotal: state.shoppingCart.orderTotal - deletingItemInCart.price,
                cartItems: [
                    ...state.shoppingCart.cartItems.slice(0,deletingItemIndex),
                    ...state.shoppingCart.cartItems.slice(deletingItemIndex + 1),
                ]
            }
        }
        return state.shoppingCart;
  
      case 'ALL_ITEMS_REMOVED_FROM_CART':
        const delItemIndex = state.shoppingCart.cartItems.findIndex((el)=>el.id===action.payload);
        const delItemInCart = state.shoppingCart.cartItems[delItemIndex]; 
        return {
            ...state.shoppingCart,
            orderTotal: state.shoppingCart.orderTotal - delItemInCart.total,
            cartItems: [
                ...state.shoppingCart.cartItems.slice(0,delItemIndex),
                ...state.shoppingCart.cartItems.slice(delItemIndex + 1),
            ]
        }
  
      default:
        return state.shoppingCart;

    }

};

export default updateShoppingCart;
