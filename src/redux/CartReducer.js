import {createSlice} from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        item =>
          !(
            item.id === action.payload.id &&
            item.colour === action.payload.colour &&
            item.size === action.payload.size
          ),
      );
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item =>
          item.id === action.payload.id &&
          item.colour === action.payload.colour &&
          item.size === action.payload.size,
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item =>
          item.id === action.payload.id &&
          item.colour === action.payload.colour &&
          item.size === action.payload.size,
      );
      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          state.cart = state.cart.filter(
            item =>
              !(
                item.id === action.payload.id &&
                item.colour === action.payload.colour &&
                item.size === action.payload.size
              ),
          );
        } else {
          itemPresent.quantity--;
        }
      }
    },
    cleanCart: state => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export const selectCartTotal = state =>
  state.cart.cart.reduce(
    (total, item) => total + item.price.amount * item.quantity,
    0,
  );

export default CartSlice.reducer;
