import { AccordionSummary, Accordion, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function AddressTab(props) {
	const methods = useFormContext();
	const { control, formState, getValues } = methods;

	const { errors } = formState;
	const [description, setDescription] = useState("");

	function handleAddAddress() {
		dispatch(addAddress(getValues())).then(() => {

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
		</div>
	);
}

export default AddressTab;
