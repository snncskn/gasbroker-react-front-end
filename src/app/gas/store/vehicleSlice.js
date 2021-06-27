import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getVehicle = createAsyncThunk('eCommerceApp/product/getVehicle', async params => {
	const response = await axios.get('/api/e-commerce-app/product', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const removeVehicle = createAsyncThunk(
	'gas/vehicle/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().gas.vehicle;
		await axios.post('/api/e-commerce-app/remove-product', { id });

		return id;
	}
);

export const saveVehicle = createAsyncThunk(
	'gas/vehicle/saveProduct',
	async (vehicleData, { dispatch, getState }) => {
		 
		const { vehicle } = getState().gas.vehicle;
		const response = await axios.post(process.env.REACT_APP_API_URL + '/vehicle', { ...vehicle, ...vehicleData });
		const data = await response.data.body;

		return data;
	}
);

const vehicleSlice = createSlice({
	name: 'gas/vehicle',
	initialState: null,
	reducers: {
		resetVehicle: () => null,
		newVehicle: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					company_id:'',
					name:'',
					type:'',
					registered_date:'',

/*					name: '',
					handle: '',
					description: '',
					categories: [],
					tags: [],
					images: [],
					priceTaxExcl: 0,
					priceTaxIncl: 0,
					taxRate: 0,
					comparedPrice: 0,
					quantity: 0,
					sku: '',
					width: '',
					height: '',
					depth: '',
					weight: '',
					extraShippingFee: 0,
					*/
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getVehicle.fulfilled]: (state, action) => action.payload,
		[saveVehicle.fulfilled]: (state, action) => action.payload,
		[removeVehicle.fulfilled]: (state, action) => null
	}
});

export const { newVehicle, resetVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;
