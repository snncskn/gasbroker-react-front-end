import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getVehicle = createAsyncThunk('gas/vehicles/getVehicle', async params => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/vehicle/' + params.vehicleId);
	const data = await response.data.body;

	return data === undefined ? null : data;;
});

export const removeVehicle = createAsyncThunk(
	'gas/vehicle/removeProduct',
	async (val, { dispatch, getState }) => {
		const { id } = getState().gas.vehicle;
		await axios.put(process.env.REACT_APP_API_URL + '/vehicle/delete/'+id, { id });

		return id;
	}
);

export const saveVehicle = createAsyncThunk('gas/customer/saveVehicle', async item => {
	if (item.id) {
		const response = await axios.put(process.env.REACT_APP_API_URL + '/vehicle/' + item.id, item);
		return await response.data.body;
	} else {
		const response = await axios.post(process.env.REACT_APP_API_URL + '/vehicle', item);
		return await response.data.body;
	}

});

const vehicleSlice = createSlice({
	name: 'gas/vehicle',
	initialState: null,
	reducers: {
		resetVehicle: () => null,
		newVehicle: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: '',
					company_id: '',
					company: '',
					name: '',
					type: '',
					registered_date: '',
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
