import { defineStore } from 'pinia'
import { request } from '../service/http.js'
import * as moduleService from '../../modules/privileges/services/module.js'

export const useModules = defineStore('modules', {
    state: () => ({
        modules: []
    }),

    actions: {
        setmodules(modules) {
            this.modules = modules
        },
        
        async getModules() {
            try {
                const { data, error } = await request(() => moduleService.getAllModulesAvailable())
                if (!error) {
                    this.setModules(data.data)
                    return true
                }
                return null
            }
            catch (error) {
                return null
            }
        },
    }
})
