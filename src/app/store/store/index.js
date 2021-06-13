import { combineReducers } from '@reduxjs/toolkit';
 
import customer from './customerSlice';
import customers from './customersSlice';

const reducer = combineReducers({
	customers,
	customer, 
});

export default reducer;
