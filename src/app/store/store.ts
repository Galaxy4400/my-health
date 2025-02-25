import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { accountListReducer } from 'entities/account/account-list';
import { accountDataReducer } from 'entities/account/account-data';
import { categoryDataReducer } from 'entities/category/category-data';
import { categoryListReducer } from 'entities/category/category-list';
import { operationDataReducer } from 'entities/operation/operation-data';
import { operationListReducer } from 'entities/operation/operation-list';

const rootReducer = combineReducers({
	accountData: accountDataReducer,
	accountList: accountListReducer,
	operationData: operationDataReducer,
	operationList: operationListReducer,
	categoryData: categoryDataReducer,
	categoryList: categoryListReducer,
});

export const store = configureStore({ reducer: rootReducer });
