import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../store';
import { resetCustomer, getCustomer,newCustomer } from '../store/customerSlice';
 
import CustomerDetailsTab from './tabs/CustomerDetailsTab';
 
function Customer(props) {
	const dispatch = useDispatch();
	const customer = useSelector(({ gas }) => gas.customer);
	const theme = useTheme();

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noOrder, setNoOrder] = useState(false);

	useDeepCompareEffect(() => {
		console.log(999);
		
		function updateCustomerState() {
			const { customerId } = routeParams;
			console.log(customerId);

			if (customerId === 'new') {
				dispatch(newCustomer());
			} else {
				dispatch(getCustomer(routeParams)).then(action => {
					if (!action.payload) {
						setNoOrder(true);
					}
				});
			}
		}
		updateCustomerState();

	


	}, [dispatch, routeParams]);

	useEffect(() => {
		return () => {
			console.log(999);
			dispatch(resetCustomer());
			setNoOrder(false);
		};
	}, [dispatch]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	if (noOrder) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such order!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/orders"
					color="inherit"
				>
					Go to Orders Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				customer && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							asdasdas
							<motion.div
								initial={{ x: 20, opacity: 0 }}
								animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
							>
								<Typography
									className="flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/orders"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4 font-medium">Users</span>
								</Typography>
							</motion.div>

							<div className="flex flex-col min-w-0 items-center sm:items-start">
								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
								>
									<Typography className="text-16 sm:text-20 truncate font-semibold">
										{`customer ${customer.reference}`}
									</Typography>
									<Typography variant="caption" className="font-medium">
										{`From ${customer.firstName} ${customer.lastName}`}
									</Typography>
								</motion.div>
							</div>
						</div>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64" label="Customer Details" />
					<Tab className="h-64" label="Address" />
					<Tab className="h-64" label="Documents" />
				</Tabs>
			}
			content={
				customer && (
					<div className="p-16 sm:p-24 max-w-2xl w-full">
					 
						{tabValue === 0 && <CustomerDetailsTab />}
						{tabValue === 1 && <AddressTab />}
						{tabValue === 2 && <CustomerDocumentsTab/>}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('gas', reducer)(Customer);
