import { createSelector } from '@reduxjs/toolkit';

const selectAccountListState = (state: RootState) => state.accountList;

export const selectAccountList = createSelector(selectAccountListState, (state) => state.accounts);

export const selectAccountListLoading = createSelector(selectAccountListState, (state) => state.loading);

export const selectAccountListError = createSelector(selectAccountListState, (state) => state.error);
