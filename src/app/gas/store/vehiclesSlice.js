import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVehicles = createAsyncThunk('gas/vehicles/getVehicles', async () => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/vehicle');
	const data = await response.data.body;
	console.log(data);
	return data;
});

export const removeVehicles = createAsyncThunk(
	'gas/vehicles/removeVehicles',
	async (vehicleIds, { dispatch, getState }) => {
		await axios.post('/api/gas/remove-vehicles', { vehicleIds });

		return vehicleIds;
	}
);

const vehiclesAdapter = createEntityAdapter({});

export const { selectAll: selectVehicles, selectById: selectVehicleById } = vehiclesAdapter.getSelectors(
	state => state.gas.vehicles
);

const vehiclesSlice = createSlice({
	name: 'gas/vehicles',
	initialState: vehiclesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setVehiclesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getVehicles.fulfilled]: vehiclesAdapter.setAll,
		[removeVehicles.fulfilled]: (state, action) => vehiclesAdapter.removeMany(state, action.payload)
	}
});

export const { setVehiclesSearchText } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
