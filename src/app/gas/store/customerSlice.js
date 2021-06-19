import FuseUtils from '@fuse/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomer = createAsyncThunk('gas/customer/getCustomer', async params => {
	const response = await axios.get('/api/e-commerce-app/customer', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveCustomer = createAsyncThunk('gas/customer/saveCustomer', async order => {
	const response = await axios.post('/api/e-commerce-app/customer/save', order);
	const data = await response.data;

	return data;
});

export const removeCustomer = createAsyncThunk(
	'gas/customer/removeCustomer',
	async (val, { dispatch, getState }) => {
		const { id } = getState().gas.product;
		await axios.post('/api/e-commerce-app/remove-customer', { id });

		return id;
	}
);

const customerSlice = createSlice({
	name: 'gas/customer',
	initialState: null,
	reducers: {
		resetCustomer: () => null,
		newCustomer:{
			reducer: (state,action) =>  action.payload,
			prepare: event=>({
				payload:{
					id: FuseUtils.generateGUID(),
					name:''
				}
			})
		}
	},
	extraReducers: {
		[getCustomer.fulfilled]: (state, action) => action.payload,
		[saveCustomer.fulfilled]: (state, action) => action.payload,
	 
	}
});

export const { newCustomer,resetCustomer } = customerSlice.actions;

export default customerSlice.reducer;
