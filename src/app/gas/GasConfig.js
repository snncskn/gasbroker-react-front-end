import i18next from 'i18next';
import { lazy } from 'react';

const GasConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		
		{
			path: '/customer/:customerId',
			component: lazy(() => import('./customer/Customer'))
		},
		{
			path: '/customer',
			component: lazy(() => import('./customer/Customer'))
		},
		{
			path: '/customers',
			component: lazy(() => import('./customers/Customers'))
		},
		{
			path: '/vehicle/:vehicleId',
			component: lazy(() => import('./vehicle/Vehicle'))
		}

		

	]
};

export default GasConfig;

