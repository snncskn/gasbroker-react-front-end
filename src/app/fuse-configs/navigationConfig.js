import i18next from 'i18next';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'users',
				title: 'Users',
				translate: 'USERS',
				type: 'item',
				icon: 'whatshot',
				url: '/user'
			},
			{
				id: 'customers',
				title: 'Customer',
				translate: 'NEW_CUSTOMERS',
				type: 'item',
				icon: 'whatshot',
				url: '/customers'
			},
			{
				id: 'vehicles',
				title: 'Vehicles',
				translate: 'VEHICLE',
				type: 'item',
				icon: 'whatshot',
				url: '/vehicles'
			},
			{
				id: 'products',
				title: 'Products',
				translate: 'PRODUCT',
				type: 'item',
				icon: 'whatshot',
				url: '/products'
			},

		]
	}
];

export default navigationConfig;
