export default [
	{
		path: '/users',
		name: 'users',
		meta: { layout: 'empty' },
		component: () => import('../pages/ListUsers.vue'),
	},
]