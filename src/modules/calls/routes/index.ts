export default [
	{
		path: '/configuration/type-calls',
		name: 'type-calls',
		meta: { layout: 'empty' },
		component: () => import('../pages/TypeCalls.vue'),
	},
	{
		path: '/calls',
		name: 'calls',
		meta: { layout: 'empty' },
		component: () => import('../pages/Calls.vue'),
	},
]