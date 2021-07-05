import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import UserConfig from 'app/gas/auth/UserConfig';
import GasConfig from 'app/gas/GasConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';

const routeConfigs = [UserConfig, GasConfig, LoginConfig, RegisterConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/customers/" />
	},
	{
		path: '/user',
		component: () => <Redirect to="/user" />
	},
	{
		path: '/vehicle',
		component: () => <Redirect to="/vehicle" />
	},
	{
		path: '/vehicles',
		component: () => <Redirect to="/vehicles" />
	},
	{
		path: '/product',
		component: () => <Redirect to="/product" />
	},
	{
		path: '/products',
		component: () => <Redirect to="/products" />
	}

];

export default routes;
