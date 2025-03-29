import Auth from '../../modules/auth/routes'
import UserList from '../../modules/user/routes'
import Privileges from '../../modules/privileges/routes'
import Calls from '../../modules/calls/routes'
import Customers from '../../modules/customers/routes'
import Goals from '../../modules/goals/routes'
import Reservations from '../../modules/reservation/routes'
import Metrics from '../../modules/metrics/routes'
import Reports from '../../modules/reports/routes'

export default [
	{
		path: '/:pathMatch(.*)',
		component: () => import('../pages/NotFound.vue'),
		meta: { name: 'Not Found' },
	},
	{
		path: '/',
		name: 'home',
		component: () => import('../pages/home.vue'),
		meta: { layout: 'base' },
		children: [
			...UserList,
			...Privileges,
			...Calls,
			...Customers,
			...Goals,
			...Reservations,
			...Metrics,
			...Reports
		]
	},
	...Auth
];
