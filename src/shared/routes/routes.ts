import Auth from '../../modules/auth/routes'

export default [
	// {
	// 	path: '/:pathMatch(.*)',
	// 	component: () => import('../../modules/auth/pages/404.vue'),
	// 	meta: { name: 'Not Found' },
	// },
	{
		path: '/',
		name: 'home',
		component: () => import('../pages/home.vue'),
		meta: { layout: 'base' },
	},
	...Auth
];
