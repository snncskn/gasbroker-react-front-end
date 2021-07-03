import { combineReducers } from '@reduxjs/toolkit';
 
import customer from './customerSlice';
import customers from './customersSlice';
import vehicle from './vehicleSlice';
import vehicles from './vehiclesSlice';
import product from './productSlice';
import products from './productsSlice';

const reducer = combineReducers({
	customers,
	customer,
	vehicle,
	vehicles,
	product,
	products
});

export default reducer;
