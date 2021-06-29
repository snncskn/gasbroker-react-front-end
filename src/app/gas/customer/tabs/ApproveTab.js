import { TextField, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import EmailIcon from '@material-ui/icons/Email';
import { Controller, useFormContext } from 'react-hook-form';

function ApproveTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const columns = [
		{
			field: 'document_id',
			headerName: 'ID',
			flex: 1,
			editable: true,
			hide: true

		},
		{
			field: 'document_name',
			headerName: 'Evrak Adı',
			flex: 1,
			editable: true,
		}
	];

	const rows = [
		{ id: 1, document_name: 'file1asdadasdasdasdasd' },
		{ id: 2, document_name: 'file2' },
		{ id: 3, document_name: 'file3' },
	];

	return (
		<div>
			<Controller
				name="documents"
				control={control}
				render={({ field }) => (
					<DataGrid
						{...field}
						id="documents"
						aria-label="Files"
						rows={rows}
						columns={columns}
						autoHeight={true}
						autoPageSize={true}
						checkboxSelection
					/>
				)}
			/>

			<Controller
				name="files"
				control={control}
				render={({ field }) => (
					<Button
						{...field}
						variant="contained"
						color="primary"
						endIcon={<EmailIcon>send</EmailIcon>}
						fullWidth
					>
						Üyeye mail at, eksik evrak var
					</Button>
				)}
			/>
		</div>
	);
}

export default ApproveTab;
