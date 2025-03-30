import { defineStore } from 'pinia'
import { request } from '../../../shared/service/http.js'
import * as authService from '../services/auth.js'

export const useAuth = defineStore('auth', {
    state: () => ({
        user: null
    }),

    actions: {
        setUser(user) {
            this.user = user
        },

        async login(payload) {
            try {
                const { data, error } = await request(() => authService.login(payload))
                if (!error) {
                    this.setUser(data.data)
                    localStorage.setItem('token', data.data.access_token);
                    return data.data
                }
                return false
            } catch (error) {
                return false
            }
        },

        async getUser() {
            try {
                const { data, error } = await request(() => authService.getUser())
                if (!error) {
                    this.setUser(data.data)
                    return true
                }
                this.setUser(null)
                return null
            } catch (error) {
                this.setUser(null)
                return null
            }
        },

        async logout() {
            try {
                const { error } = await request(() => authService.logout())
                if (!error) {
                    localStorage.clear()
                    this.setUser(null)
                }
            } catch (error) {
            }
        }
    }
})
