import i18next from 'i18next';
import UserForm from './user/UserForm';
import en from './i18n/en';
import tr from './i18n/tr'; 

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);

const UserConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/user',
			component: UserForm
		}
	]
};

export default UserConfig;

