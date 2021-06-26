import FuseUtils from '@fuse/utils';
import { AccordionSummary, Accordion, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
 
import { useDispatch, useSelector } from 'react-redux';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GoogleMap from 'google-map-react';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { addAddressCustomer } from 'app/gas/store/customerSlice';


function AddressTab(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const customer = useSelector(({ gas }) => gas.customer);

	const { control, formState, getValues } = methods;

	const { errors } = formState;
	const [description, setDescription] = useState("");
 

	function handleAddAddress() {

		let newAddress ={
			id: FuseUtils.generateGUID(),
			company_id:customer.id,
			description:description,
			type:'İş Adresi',
			lat:'40.825836927685216',
			lng:'29.29126361565859'};
		customer.address.push(newAddress);
	 dispatch(addAddressCustomer(newAddress)).then(() => {
	//	history.push('/customers');
	});

	} 
	return (
		<div>
			<Controller
				name="description"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<TextField
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						onChange={async e => {
							console.log(e);
							setDescription(e.target.value);
						}}
						helperText={errors?.name?.message}
						label="Description"
						autoFocus
						id="description"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Button
				className="whitespace-nowrap mx-4"
				variant="contained"
				color="secondary" 
				onClick={handleAddAddress}
			>
				Add
			</Button>

			{customer.address.map(_item => (
			 <div>{_item.description} </div>
			))}

			<Accordion
						className="shadow-0 border-0 overflow-hidden"
					 
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							classes={{ root: 'border border-solid rounded-16 mb-16' }}
						>
							<Typography className="font-semibold">Invoice Address</Typography>
						</AccordionSummary>
						<AccordionDetails className="flex flex-col md:flex-row -mx-8">
							<Typography className="w-full md:max-w-256 mb-16 md:mb-0 mx-8 text-16">
							asdasdas
							</Typography>
							<div className="w-full h-320 rounded-16 overflow-hidden mx-8">
								<GoogleMap
									bootstrapURLKeys={{
										key: process.env.REACT_APP_MAP_KEY
									}}
									defaultZoom={15}
									 
								>
								 
								</GoogleMap>
							</div>
						</AccordionDetails>
					</Accordion>
		</div>
	);
}

export default AddressTab;
