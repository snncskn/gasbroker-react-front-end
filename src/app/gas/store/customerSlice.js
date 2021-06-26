import FuseUtils from '@fuse/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomer = createAsyncThunk('gas/customer/getCustomer', async params => {
	const response = await axios.get(process.env.REACT_APP_API_URL+'/company/'+params.customerId);
	const data = await response.data.body;
	console.log(data);
	return data === undefined ? null : data;
});

export const saveCustomer = createAsyncThunk('gas/customer/saveCustomer', async item => {
	if(item.company_id){
		const response = await axios.put(process.env.REACT_APP_API_URL+'/company/'+item.company_id, item);
		return await response.data.body;
	}else{
		const response = await axios.post(process.env.REACT_APP_API_URL+'/company', item);
		const company =  response.data.body;
		const responseCompany = await axios.get(process.env.REACT_APP_API_URL+'/company/'+company.id);
		return await responseCompany.data.body;
		
		
	}

});
export const addAddressCustomer = createAsyncThunk('gas/customer/addAddressCustomer', async item => {
	if(item.address_id){
		const response = await axios.put(process.env.REACT_APP_API_URL+'/address/'+item.company_id, item);
		return await response.data.body;
	}else{ 
		const response = await axios.post(process.env.REACT_APP_API_URL+'/address', item);
		return await response.data.body;
	}

});
export const removeCustomer = createAsyncThunk(
	'gas/customer/removeCustomer',
	async (val, { dispatch, getState }) => {
		 
		const { company_id } = getState().gas.customer;
		await axios.delete(process.env.REACT_APP_API_URL+'/company/delete/'+company_id);

		return company_id;
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
					name:'',
					full_company_name:'',
					address:[],
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
