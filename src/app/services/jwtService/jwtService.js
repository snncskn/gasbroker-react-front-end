import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import settings from './settings';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		console.log(12312312);
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		console.log(999999);
		axios.interceptors.response.use(
			response => {
				console.log(123);
				const jwt_access_token = localStorage.getItem('jwt_access_token');
				response.headers.Authorization = `Bearer ${jwt_access_token}`;
				//x-access-token
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {

		return new Promise((resolve, reject) => {
			axios
				.post(process.env.REACT_APP_API_URL+'/auth/signin', {
						username:email,
						password
				})
				.then(response => {
					console.log(response);
					if (response.data) {
						this.setSession(response.data.accessToken);
						
						response.uuid = 'XgbuVEXBU6gtSKdbTYR1Zbbby1i3';
						response.from = 'custom-db';
						response.password = 'staff';
						response.role = 'staff';
						response.data.photoURL = 'assets/images/avatars/Arnold.jpg';
						response.data.email = 'staff@fusetheme.com';
		
						response.data.redirectUrl ='http://localhost:3000/customers';
						response.data.data = {
							displayName: 'Arnold Matlock',
							shortcuts: ['calendar', 'mail', 'contacts', 'todo']
						};
						response.data.data.settings= settings;
						resolve(response.data);
					} else {
						reject(response.data);
					}
				}).catch(error => {
					console.log(error);
					reject([{type:'password',message:error.message}]);

				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth/access-token', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
