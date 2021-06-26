import { AccordionSummary, Accordion } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function AddressTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;


	return (
		<div>
		<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.name}
						required
						helperText={errors?.name?.message}
						label="Description"
						autoFocus
						id="description"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default AddressTab;
