import { combineReducers } from '@reduxjs/toolkit';
 
import customer from './customerSlice';
import customers from './customersSlice';
import vehicle from './vehicleSlice';
import vehicles from './vehiclesSlice';

const reducer = combineReducers({
	customers,
	customer,
	vehicle,
	vehicles
});

export default reducer;
