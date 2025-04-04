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

		const middleware = to?.meta?.middleware;
		const isCallableMiddleware = typeof middleware === 'function';
		let isAuth = false

		if (to.name !== 'login') isAuth = await auth(to, from);
		if (to.name === 'login') return await login(to, from);
		if (isCallableMiddleware) return await middleware(to, from);


		if (isAuth === true) {
			const modulesStore = useModules();
			const { modules } = storeToRefs(modulesStore);

			if (!modules.value || modules.value.length == 0) await modulesStore.getModules()
			let hasPermissionRoute = false

			modules.value.forEach((el) => {
				if (el.route == to.name) hasPermissionRoute = true
				if (
					to.name == "not_permission" ||
					to.name == "not_found" ||
					to.name == "home" ||
					to.name == "login" ||
					to.name == "logout"
				) hasPermissionRoute = true

				if (el.submodules.length > 1) {
					el.submodules.forEach((subModule) => {
						if (subModule.route == to.name) hasPermissionRoute = true
					})
				}
			})

			if (!hasPermissionRoute) return { name: "not_permission" }
		}
		else return { name: "login" }

		return true;
	});

	return router;
}
