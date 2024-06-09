import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  }
};


const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    }, 
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = Number(action.payload.categoryId);
      state.sort = Number(action.payload.sort);
    }
  }
});

export const selectCategoryId = state => state.filter.categoryId;
export const selectSortProperty = state => state.filter.sort.sortProperty;
export const selectCurrentPage = state => state.filter.currentPage;
export const selectSearchValue = state => state.filter.searchValue;
export const selectSort = state => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer; 
