import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomers = createAsyncThunk('gas/customers/getCustomers', async () => {
 
	const response = await axios.get(process.env.REACT_APP_API_URL+'/company');
	const data = await response.data.body;
	return data;
});

export const removeCustomers = createAsyncThunk(
	'gas/customers/removeCustomers',
	async (customerIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-customers', { customerIds });

		return customerIds;
	}
);

const customersAdapter = createEntityAdapter({});

export const { selectAll: selectCustomers, selectById: selectCustomerById } = customersAdapter.getSelectors(
	state => state.gas.customers
);

const customersSlice = createSlice({
	name: 'gas/customers',
	initialState: customersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCustomersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCustomers.fulfilled]: customersAdapter.setAll,
		[removeCustomers.fulfilled]: (state, action) => customersAdapter.removeMany(state, action.payload)
	}
});

export const { setCustomersSearchText } = customersSlice.actions;

export default customersSlice.reducer;
