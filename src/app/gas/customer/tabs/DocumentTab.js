import { TextField, InputAdornment, Button, Icon } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { getDocumentByTypes } from 'app/gas/store/customerSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import FuseUtils from '@fuse/utils';


const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));


function DocumentTab(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);

	const methods = useFormContext();
	const { control, watch } = methods;
	const media = watch('media');
	const types = watch('types');
	console.log(media);
	const [documents, setDocuments] = useState([]);


	useEffect(() => {
		dispatch(getDocumentByTypes(types)).then(action => {
			if (action.payload) {
				const tmpData = action.payload;
				console.log(documents)
				const tmpAr = [];
				tmpData.map((item, index) => {
					if (item.json_value) {
						item.json_value.docs.map((it, i) => {
							let tmp = { id: i, title: it.title, url: '' };
							tmpAr.push(tmp);
						})
					}
				});
				setDocuments(...documents, tmpAr);

			}
		});

	}, [dispatch]);

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			flex: 1,
			editable: true,
			hide: true

		},
		{
			field: 'title',
			headerName: 'File Name',
			flex: 1,
			editable: true,
		}
	];


	return (
		<div>
			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Controller
					name="images"
					control={control}
					defaultValue={[]}
					render={({ field: { onChange, value } }) => (
						<label
							htmlFor="button-file"
							className={clsx(
								classes.productImageUpload,
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
							)}
						>
							<input
								accept="image/*"
								className="hidden"
								id="button-file"
								type="file"
								onChange={async e => {
									function readFileAsync() {
										return new Promise((resolve, reject) => {
											const file = e.target.files[0];
											if (!file) {
												return;
											}
											const reader = new FileReader();

											reader.onload = () => {
												resolve({
													id: FuseUtils.generateGUID(),
													url: `data:${file.type};base64,${btoa(reader.result)}`,
													type: 'image'
												});
											};

											reader.onerror = reject;

											reader.readAsBinaryString(file);
										});
									}

									const newImage = await readFileAsync();

									onChange([newImage, ...value]);
								}}
							/>
							<Icon fontSize="large" color="action">
								cloud_upload
							</Icon>
						</label>
					)}
				/>
				<Controller
					name="featuredImageId"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) =>
						documents.map(media => (
							<div
								onClick={() => onChange(media.id)}
								onKeyDown={() => onChange(media.id)}
								role="button"
								tabIndex={0}
								className={clsx(
									classes.productImageItem,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
									media.id === value && 'featured'
								)}
								key={media.id}
							>
								<img className="max-w-none w-auto h-full" src={media.url} alt={media.title} />
							</div>
						))
					}
				/>
			</div >
			</div >
			);
}

export default DocumentTab;
