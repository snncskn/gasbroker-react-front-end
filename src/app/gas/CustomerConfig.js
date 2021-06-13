import i18next from 'i18next';
import { lazy } from 'react';

const CustomerConfig = {
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
		}

	]
};

export default CustomerConfig;

