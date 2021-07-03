
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('gas/products/getProducts', async () => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/product');
	const data = await response.data.body;
	return data;
});

export const removeProducts = createAsyncThunk('gas/products/removeProducts',
	async (productIds, { dispatch, getState }) => {
		await axios.post('/api/gas/remove-products', { productIds });
		return productIds;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.gas.products
);

const productsSlice = createSlice({
	name: 'gas/products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll,
		[removeProducts.fulfilled]: (state, action) => productsAdapter.removeMany(state, action.payload)
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
