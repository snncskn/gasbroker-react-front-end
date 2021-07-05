import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct	 = createAsyncThunk('gas/products/getProduct', async params => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/product/' + params.productId);
	const data = await response.data.body;
	return data === undefined ? null : data;;
});

export const removeProduct = createAsyncThunk('gas/product/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().gas.product;
		await axios.post('/api/e-commerce-app/remove-product', { id });
		return id;
	}
);

export const saveProduct = createAsyncThunk('gas/product/saveProduct', async item => {
	if (item.id) {
		const response = await axios.put(process.env.REACT_APP_API_URL + '/product/' + item.id, item);
		return await response.data.body;
	} else {
		const response = await axios.post(process.env.REACT_APP_API_URL + '/product', item);
		return await response.data.body;
	}
});

const productSlice = createSlice({
	name: 'gas/product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: '',
					name: '',
					code: ''
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload,
		[removeProduct.fulfilled]: (state, action) => null
	}
});

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;