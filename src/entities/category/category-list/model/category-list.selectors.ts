import { createSelector } from '@reduxjs/toolkit';

const selectCategoryListState = (state: RootState) => state.categoryList;

export const selectCategoryList = createSelector(selectCategoryListState, (state) => state.categories);

export const selectCategoryListLoading = createSelector(selectCategoryListState, (state) => state.loading);

export const selectCategoryListError = createSelector(selectCategoryListState, (state) => state.error);
