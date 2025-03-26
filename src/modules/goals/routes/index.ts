export default [
	{
		path: '/goals',
		name: 'goals',
		meta: { layout: 'empty' },
		component: () => import('../pages/ListGoals.vue'),
	},
]