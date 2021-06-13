import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import { lazy } from 'react';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);

const CustomerConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		
		{
			path: '/customer/:customerId',
			component: lazy(() => import('./form/Customer'))
		},
		{
			path: '/customer',
			component: lazy(() => import('./form/Customer'))
		}

	]
};

export default CustomerConfig;

