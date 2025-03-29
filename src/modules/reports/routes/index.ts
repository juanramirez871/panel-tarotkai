export default [
	{
		path: '/reports',
		name: 'reports',
		meta: { layout: 'empty' },
		component: () => import('../pages/Reports.vue'),
	},
]