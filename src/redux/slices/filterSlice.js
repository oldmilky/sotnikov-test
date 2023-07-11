import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postName: '',
  username: [],
  favoritesOnly: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPostNameFilter: (state, action) => {
      state.postName = action.payload;
    },
    setUsernameFilter: (state, action) => {
      state.username = action.payload;
    },
    toggleFavoritesOnlyFilter: (state, action) => {
      state.favoritesOnly = action.payload;
    },
  },
});

export const {
  setPostNameFilter,
  setUsernameFilter,
  toggleFavoritesOnlyFilter,
} = filterSlice.actions;

export const selectPostNameFilter = state => state.filter.postName;
export const selectUsernameFilter = state => state.filter.username;
export const selectFavoritesOnlyFilter = state => state.filter.favoritesOnly;

export default filterSlice.reducer;