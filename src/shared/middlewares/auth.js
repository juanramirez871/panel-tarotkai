import { storeToRefs } from 'pinia'
import { useAuth } from '../../modules/auth/store/auth.store'

export default async (to, from) => {
	const authStore = useAuth()
	const { user } = storeToRefs(authStore)

	const isPublicRoute = ['login'].includes(to.name)

	try {
		if (user.value?.idUser) return true

		if (from.name === 'login' && !user.value) return false

		if (!isPublicRoute && !user.value) {
			const userData = await authStore.getUser()

			if (!userData) return { name: 'login' }
		}

		return true
	} catch (error) {
		return isPublicRoute ? true : { name: 'login' }
	}
}
