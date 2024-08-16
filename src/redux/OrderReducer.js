import {createSlice} from '@reduxjs/toolkit';

export const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const {placeOrder} = OrderSlice.actions;

export default OrderSlice.reducer;
