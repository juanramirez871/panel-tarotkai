export default [
	{
		path: '/configuration/users',
		name: 'users',
		meta: { layout: 'empty' },
		component: () => import('../pages/ListUsers.vue'),
	},
]