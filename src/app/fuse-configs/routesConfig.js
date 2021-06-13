import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import UserConfig from 'app/gas/auth/UserConfig';
import CustomerConfig from 'app/gas/CustomerConfig';

const routeConfigs = [UserConfig,CustomerConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/customer" />
	},
	{
		path: '/user',
		component: () => <Redirect to="/user" />
	}

];

export default routes;
