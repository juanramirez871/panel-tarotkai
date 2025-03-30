export default [
	{
		path: '/customers',
		name: 'customers',
		meta: { layout: 'empty' },
		component: () => import('../pages/CustomerList.vue'),
	},
]