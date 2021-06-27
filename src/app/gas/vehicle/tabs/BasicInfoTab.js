import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { useFormContext, Controller } from 'react-hook-form';

function BasicInfoTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="company_id"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="company_id"
						autoFocus
						id="company_id"
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
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="type"
						autoFocus
						id="type"
						variant="outlined"
						fullWidth
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
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
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
