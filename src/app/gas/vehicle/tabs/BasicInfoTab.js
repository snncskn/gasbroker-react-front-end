import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { getCustomers } from 'app/gas/store/customersSlice';
import { getVehicleType } from 'app/gas/store/vehicleSlice';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';

function BasicInfoTab(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;
	const company = watch('company');
	const type = watch('type');
	const [vehicleTypes, setVehicleTypes] = useState();



	const [loading, setLoading] = useState(true);
	const [customers, setCustomers] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getCustomers()).then((data) => {
			setLoading(false);
			setCustomers(data.payload);

		});
		dispatch(getVehicleType('VEHICLE_TYPE')).then(action => {
			if (action.payload) {
				setVehicleTypes(action.payload);
			}
		});

	}, [dispatch]);


	return (
		<div>

			<Controller
				name="company_id"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						options={customers}
						defaultValue={company.name}
						getOptionLabel={label => {
							if (label.name) {

								return label.name;
							} else {
								return label;

							}
						}}

						onChange={(event, newValue) => {
							console.log(newValue)
							setValue(
								'company_id',
								newValue.id
							);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select company"
								label="Company"

								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<Controller
				name="type"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						options={vehicleTypes}
						defaultValue={type}
						getOptionLabel={label => {
							if (label.name) {

								return label.name;
							} else {
								return label;

							}
						}}

						onChange={(event, newValue) => {
							console.log(newValue)
							setValue(
								'type',
								newValue.name
							);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Type"
								label="Type"

								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="registered_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.registered_date}
						required
						type="date"
						helperText={errors?.registered_date?.message}
						label="Registered Date"
						autoFocus
						id="registered_date"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
