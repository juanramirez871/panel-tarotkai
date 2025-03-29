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
                const { data, error } = await request(() => authService.Login(payload))
                if (!error) {
                    this.setUser(data.data.user)
                    return true
                }
                return false
            } catch (error) {
                return false
            }
        },

        async getUser() {
            try {
                const { data, error } = await request(() => authService.GetUser())
                if (!error) {
                    this.setUser(data.data)
                    return data.data
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
                const { error } = await request(() => authService.Logout())
                if (!error) {
                    localStorage.clear()
                    this.setUser(null)
                }
            } catch (error) {
            }
        }
    }
})
