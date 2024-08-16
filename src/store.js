import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './redux/CartReducer';
import FavoritesReducer from './redux/FavouriteReducer';
import CheckoutReducer from './redux/CheckoutReducer';
import OrderReducer from './redux/OrderReducer';

export default configureStore({
  reducer: {
    cart: CartReducer,
    favorites: FavoritesReducer,
    checkout: CheckoutReducer,
    order: OrderReducer,
  },
});
