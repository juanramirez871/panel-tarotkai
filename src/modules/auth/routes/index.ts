export default [
	{
		path: '/login',
		name: 'login',
		meta: { layout: 'empty' },
		component: () => import('../pages/login.vue'),
	}
]