import Auth from '../../modules/auth/routes'
import UserList from '../../modules/user/routes'
import Privileges from '../../modules/privileges/routes'

export default [
	{
		path: '/:pathMatch(.*)',
		component: () => import('../pages/NotFound.vue'),
		meta: { name: 'Not Found' },
	},
	{
		path: '/',
		name: 'home',
		component: () => import('../pages/home.vue'),
		meta: { layout: 'base' },
		children: [
			...UserList,
			...Privileges
		]
	},
	...Auth
];
