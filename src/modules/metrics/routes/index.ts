export default [
	{
		path: '/metrics',
		name: 'metrics',
		meta: { layout: 'empty' },
		component: () => import('../pages/ListMetrics.vue'),
	},
]