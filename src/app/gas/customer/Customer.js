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
import { resetCustomer, newCustomer, getCustomer, saveCustomer } from '../store/customerSlice';
import reducer from '../store';
import CustomerHeader from './CustomerHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

import PricingTab from './tabs/DocumentTab';
import ShippingTab from './tabs/ShippingTab';
import AddressTab from './tabs/AddressTab';
import DocumentTab from './tabs/DocumentTab';
import ApproveTab from './tabs/ApproveTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	full_name: yup
		.string()
		.required('You must enter the full company name')
		.min(5, 'The full company name must be at least 5 characters'),
	name: yup
		.string()
		.required('You must enter the company name')
		.min(5, 'The company name must be at least 5 characters'),
		
});

function Customer(props) {
	const dispatch = useDispatch();
	const customer = useSelector(({ gas }) => gas.customer);

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noCustomer, setNoCustomer] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { reset, watch, control, onChange, formState } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateCustomerState() {
			const { customerId } = routeParams;

			if (customerId === 'new') {
				let newCstmr = { name:'',full_name:'',addresses:[],types:[]};
				dispatch(saveCustomer(newCstmr));
				dispatch(newCustomer());
			} else {

				dispatch(getCustomer(routeParams)).then(action => {

					if (!action.payload) {
						setNoCustomer(true);
					}
				});
				dispatch(getCustomer(routeParams)).then(action => {

					if (!action.payload) {
						setNoCustomer(true);
					}
				});

			}
		}

		updateCustomerState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!customer) {
			return;
		}

		reset(customer);
	}, [customer, reset]);

	useEffect(() => {
		return () => {
			dispatch(resetCustomer());
			setNoCustomer(false);
		};
	}, [dispatch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (noCustomer) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such customer!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Customers Page
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (_.isEmpty(form) || (customer && routeParams.customerId !== customer.id && routeParams.customerId !== 'new')) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<CustomerHeader />}
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
						<Tab className="h-64" label="Genel Bilgiler" />
						<Tab className="h-64" label="Adres" />
						<Tab className="h-64" label="Evrak Listesi" />
						<Tab className="h-64" label="Onay Süreçleri" />
						<Tab className="h-64" label="Kullanıcı Bilgileri" />
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab />
						</div>

						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<AddressTab />
						</div>

						<div className={tabValue !== 2 ? 'hidden' : ''}>
							<DocumentTab />
						</div>

						<div className={tabValue !== 3 ? 'hidden' : ''}>
							<ApproveTab />
						</div>

						<div className={tabValue !== 4 ? 'hidden' : ''}>
							<ShippingTab />
						</div>
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('gas', reducer)(Customer);
