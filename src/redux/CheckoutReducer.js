import {createSlice} from '@reduxjs/toolkit';

export const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    shippingMethod: '',
    paymentMethod: '',
    address: '',
    addressForm: {
      receiverName: '',
      completeAddress: '',
      landmark: '',
      addressType: 'Home',
      phoneNumber: '',
      city: '',
      state: '',
    },
    addresses: [],
  },
  reducers: {
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    updateAddressForm: (state, action) => {
      state.addressForm = {...state.addressForm, ...action.payload};
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
  },
});

export const {
  setShippingMethod,
  setPaymentMethod,
  setAddress,
  updateAddressForm,
  addAddress,
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
