import {
	TextField,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext, Controller } from 'react-hook-form';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	}
}));

function BasicInfoTab(props) {
	const classes = useStyles();
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const [companyNo, setCompanyNo] = useState();
	const [selectedDate, setSelectedDate] = useState();
	const [companyType, setCompanyType] = useState('Firma');

	const handleCompanyNoChange = (event) => {
		setCompanyNo(event.target.value);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleCompanyTypeChange = (event) => {
		setCompanyType(event.target.value);
	};

	return (
		<div>
			<Controller
				name="full_name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="Company Full Name"
						autoFocus
						id="full_name"
						variant="outlined"
						fullWidth
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
						label="Company Name"
						autoFocus
						id="name"
						variant="outlined"
						SelectProps={{
							native: true,
						}}
						fullWidth
					>
						{companyNos.map((option) => (
							<option key={option.no} value={option.no}>
								{option.values}
							</option >
						))}
					</TextField>
				)}
			/>  
			<Controller
				name="created_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						id="created_date"
						label="Tarih"
						type="date"
						defaultValue=""
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
					/>
				)}
			/>
			{/* <Controller
				name="company_type"
				control={control}
				render={({ field }) => (
					<FormControl component="fieldset">
						<FormLabel component="legend">Firma Türü</FormLabel>
						<RadioGroup aria-label="company_type" id="company_type" value={companyType} onChange={handleCompanyTypeChange}>
							<div >
								<FormControlLabel value="Firma" control={<Radio />} label="Firma" />
								<FormControlLabel value="Şahıs" control={<Radio />} label="Şahıs" />
							</div>
						</RadioGroup>
					</FormControl>
				)}
			/> */}
			{/** 
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						label="Description"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Controller
				name="categories"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						multiple
						freeSolo
						options={[]}
						value={value}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select multiple categories"
								label="Categories"
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
				name="tags"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						multiple
						freeSolo
						options={[]}
						value={value}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select multiple tags"
								label="Tags"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
			*/}
		</div>
	);
}

const companyNos = [
	{ no: '90383455', values: '90383455' },
	{ no: '8437362', values: '8437362' },
	{ no: '78098331', values: '78098331' },
	{ no: '67848172', values: '67848172' },
	{ no: '90912479', values: '90912479' }]

export default BasicInfoTab;
