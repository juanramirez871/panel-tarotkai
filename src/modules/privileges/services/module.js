import axios from "axios"

export function getModules(idRole) {
    return axios.get(`permission/roles/${idRole}/modules`)
}