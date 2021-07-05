import { lazy } from 'react';

const RegisterConfig = {
	settings: {
		layout: {
			config: {
                navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
            }
		}
	},
	routes: [
		{
			path: '/register',
			component: lazy(() => import('./Register'))
		}
	]
};

export default RegisterConfig;
