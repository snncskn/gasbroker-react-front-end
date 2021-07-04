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
import { addAddressCustomer, getCustomer } from 'app/gas/store/customerSlice';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router';


function AddressTab(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const customer = useSelector(({ gas }) => gas.customer);
	const routeParams = useParams();

	const { control, formState, getValues } = methods;

	const { errors } = formState;
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [companyType, setCompanyType] = useState("ev");

	const addressTypeHandle = (event) => {
		setCompanyType(event.target.value);
	};

	function resetAddressForm() {
		setTitle('');
		setDescription('');
	}

	function handleAddAddress() {
		console.log(process.env.REACT_APP_MAP_KEY);
		let newAddress = {
			id: FuseUtils.generateGUID(),
			company_id: customer.id,
			title: title,
			description: description,
			type: companyType,
			lat: '40.825836927685216',
			lng: '29.29126361565859'
		};

		dispatch(addAddressCustomer(newAddress)).then((data) => {
			dispatch(getCustomer(routeParams)).then(action => {
				resetAddressForm();
				if (!action.payload) {
					setNoCustomer(true);
				}
			});
		});


	}
	return (
		<div>
			<Controller
				name="title"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<TextField
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						multiline
						rowsMax={2}
						onChange={async e => {
							setTitle(e.target.value);
						}}
						helperText={errors?.name?.message}
						label="Title"
						autoFocus
						id="title"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<TextField
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						multiline
						rowsMax={2}
						onChange={async e => {
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
			<Controller
				name="companyType"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<RadioGroup aria-label="type" name="companyType" value={companyType} onChange={addressTypeHandle}>
						<FormControlLabel value="ev" control={<Radio />} label="Ev" />
						<FormControlLabel value="is" control={<Radio />} label="İş" />
					</RadioGroup>
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
			{ customer.addresses ?
			(
				<div>
					{customer.addresses.map((item) =>

				<Accordion
					className="shadow-0 border-0 overflow-hidden"

				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						classes={{ root: 'border border-solid rounded-16 mb-16' }}
					>
						<Typography className="font-semibold"> {item.title} </Typography>
					</AccordionSummary>
					<AccordionDetails className="flex flex-col md:flex-row -mx-8">
						<Typography className="w-full md:max-w-256 mb-16 md:mb-0 mx-8 text-16">
							{item.description}
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
				
			)}
			</div>)
			:(<div>adres yok</div>)}


		</div>
	);
}

export default AddressTab;
