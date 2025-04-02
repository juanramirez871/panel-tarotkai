import axios from "axios"

export function getModules() {
    return axios.get(`permission/modules`)
}