import { TextField, InputAdornment, Button, Icon } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Controller, useFormContext } from 'react-hook-form';

function DocumentTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			flex: 1,
			editable: true,
			hide: true

		},
		{
			field: 'fileName',
			headerName: 'File Name',
			flex: 1,
			editable: true,
		}
	];

	const rows = [
		{ id: 1, fileName: 'file1asdadasdasdasdasd' },
		{ id: 2, fileName: 'file2' },
		{ id: 3, fileName: 'file3' },
	];
	return (
		<div style={{ width: '100 % ' }}>
			<Controller
				name="upload_file"
				control={control}
				render={({ field }) => (
					<Button
						{...field}
						id="upload_file"
						variant="contained"
						color="default"
						startIcon={<AttachFileIcon />}
					>
						Evrak yükle
					</Button>
				)}
			/>
			<Controller
				name="files"
				control={control}
				render={({ field }) => (
					<DataGrid
						{...field}
						id="files"
						aria-label="Files"
						rows={rows}
						columns={columns}
						autoHeight={true}
						autoPageSize={true}
						checkboxSelection
						disableSelectionOnClick
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
						endIcon={<Icon>send</Icon>}
						fullWidth
					>
						Onaya Gönder
					</Button>
				)}
			/>
		</div >
	);
}

export default DocumentTab;
