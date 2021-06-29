import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { resetVehicle, newVehicle, getVehicle } from '../store/vehicleSlice';
import reducer from '../store';
import VehicleHeader from './VehicleHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import VehicleDocument from './tabs/VehicleDocument';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a vehicle name')
		.min(5, 'The vehicle name must be at least 5 characters')
});

function Vehicle(props) {
	const dispatch = useDispatch();
	const vehicle = useSelector(({ gas }) => gas.vehicle);

	const routeParams = useParams();

	const [tabValue, setTabValue] = useState(0);
	const [noVehicle, setNoVehicle] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateVehicleState() {
			const { vehicleId } = routeParams;

			if (vehicleId === 'new') {
				dispatch(newVehicle());
			} else {
				/**
				 * Get Vehicle data
				 */
				dispatch(getVehicle(routeParams)).then(action => {
					/**
					 * If the requested vehicle is not exist show message
					 */
					if (!action.payload) {
						setNoVehicle(true);
					}
				});
			}
		}

		updateVehicleState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		;
		if (!vehicle) {
			return;
		}
		/**
		 * Reset the form on Vehicle state changes
		 */
		reset(vehicle);
	}, [vehicle, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Vehicle on component unload
			 */
			dispatch(resetVehicle());
			setNoVehicle(false);
		};
	}, [dispatch]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
	}

	/**
	 * Show Message if the requested Vehicle is not exists
	 */
	if (noVehicle) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such Vehicle!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/vehicles"
					color="inherit"
				>
					Go to Vehicles Sinan
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while Vehicle data is loading and form is setted
	 */
	if (_.isEmpty(form) || (vehicle && routeParams.vehicleId !== vehicle.id && routeParams.vehicleId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<VehicleHeader />}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						{/* <Tab className="h-64" label="Basic Info" /> */}
						{/* <Tab className="h-64" label="Vehicle Document" /> */}					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab />
						</div>
						{/* 
						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<VehicleDocument />
						</div> */}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('gas', reducer)(Vehicle);
