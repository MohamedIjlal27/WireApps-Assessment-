import {createSlice} from '@reduxjs/toolkit';

export const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const {addFavorite, removeFavorite} = FavoritesSlice.actions;

export default FavoritesSlice.reducer;
