import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GoogleMap from 'google-map-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';


function CustomerDetailsTab() {

	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
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
		</div>
	);
}

export default CustomerDetailsTab;
