export default [
	{
		path: '/configuration/customers',
		name: 'customers',
		meta: { layout: 'empty' },
		component: () => import('../pages/CustomerList.vue'),
	},
]