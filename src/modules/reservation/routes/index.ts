export default [
	{
		path: '/reservations',
		name: 'reservations',
		meta: { layout: 'empty' },
		component: () => import('../pages/ListReservation.vue'),
	},
]