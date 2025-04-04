import { createRouter, createWebHistory } from 'vue-router';
import auth from '../middlewares/auth';
import login from '../middlewares/login';
import routes from './routes';
import { storeToRefs } from 'pinia';
import { useModules } from '../store/modules.js';

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export function createAppRouter() {

	router.beforeEach(async (to, from) => {
		const modulesStore = useModules();
		const { modules } = storeToRefs(modulesStore);

		console.log(to.name);
		console.log(modules.value);

		const middleware = to?.meta?.middleware;
		const isCallableMiddleware = typeof middleware === 'function';

		if (to.name !== 'login') return await auth(to, from);
		if (to.name === 'login') return await login(to, from);
		if (isCallableMiddleware) return await middleware(to, from);

		return true;
	});

	return router;
}
