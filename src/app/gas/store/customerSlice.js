import FuseUtils from '@fuse/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomer = createAsyncThunk('gas/customer/getCustomer', async params => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/company/' + params.customerId);
	const data = await response.data.body;
	console.log(data);
	return data === undefined ? null : data;
});

export const saveCustomer = createAsyncThunk('gas/customer/saveCustomer', async item => {
	if (item.id) {
		const response = await axios.put(process.env.REACT_APP_API_URL + '/company/' + item.id, item);
		return await response.data.body;
	} else {
		const response = await axios.post(process.env.REACT_APP_API_URL + '/company', item);
		return await response.data.body;
	}

});

export const removeCustomer = createAsyncThunk(
	'gas/customer/removeCustomer',
	async (val, { dispatch, getState }) => {

		const { id } = getState().gas.customer;
		await axios.delete(process.env.REACT_APP_API_URL + '/company/delete/' + id);

		return id;
	}
);

const customerSlice = createSlice({
	name: 'gas/customer',
	initialState: null,
	reducers: {
		resetCustomer: () => null,
		newCustomer: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					company_name: ''
				}
			})
		}
	},
	extraReducers: {
		[getCustomer.fulfilled]: (state, action) => action.payload,
		[saveCustomer.fulfilled]: (state, action) => action.payload,

	}
});

export const { newCustomer, resetCustomer } = customerSlice.actions;

export default customerSlice.reducer;
