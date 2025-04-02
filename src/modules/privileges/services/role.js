import axios from "axios"

export function getRoles() {
    return axios.get(`permission/roles`)
}

export function createRoles(payload) {
    return axios.post(`permission/role`, payload)
}

export function deleteRole(id) {
    return axios.delete(`permission/role/${id}`)
}