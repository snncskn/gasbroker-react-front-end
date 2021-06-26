import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomers = createAsyncThunk('gas/customerTypes/getCustomerTypes', async () => {

	const response = await axios.get(process.env.REACT_APP_API_URL + '/company_type');
	const data = await response.data.body;
	return data;
});

export default customerTypesSlice.reducer;
