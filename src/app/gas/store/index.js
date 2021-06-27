import { combineReducers } from '@reduxjs/toolkit';
 
import customer from './customerSlice';
import customers from './customersSlice';
import vehicle from './vehicleSlice';

const reducer = combineReducers({
	customers,
	customer,
	vehicle
});

export default reducer;
