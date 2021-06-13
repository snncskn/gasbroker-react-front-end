import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk('gas/customers/getCustomers', async () => {
	const response = await axios.get('/api/e-commerce-app/orders');
	const data = await response.data;

	return data;
});

export const removeCustomers = createAsyncThunk(
	'gas/customers/removeCustomers',
	async (customerIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-orders', { customerIds });

		return customerIds;
	}
);

const customersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = customersAdapter.getSelectors(
	state => state.eCommerceApp.orders
);

const customersSlice = createSlice({
	name: 'gas/customers',
	initialState: customersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: customersAdapter.setAll,
		[removeCustomers.fulfilled]: (state, action) => customersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = customersSlice.actions;

export default customersSlice.reducer;