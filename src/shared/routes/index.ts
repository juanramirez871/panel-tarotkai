import { createRouter, createWebHistory } from 'vue-router';
import auth from '../middlewares/auth';
import routes from './routes';
import login from '../middlewares/login';

const router: any = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from) => {
	const middleware = to?.meta?.middleware;
	const isCallableMiddleware = typeof middleware === 'function';

	if (to.name !== 'login') return await auth(to, from)
	if (to.name === 'login') return await login(to, from)
	if (isCallableMiddleware) return await middleware(to, from);

	return true;
});


export default router;
