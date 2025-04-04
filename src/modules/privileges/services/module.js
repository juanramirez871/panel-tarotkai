import axios from "axios"

export function getModules(idRole) {
    return axios.get(`permission/roles/${idRole}/modules`)
}

export function changePrivilegeRole(idRole, idPrivilege) {
    return axios.put(`permission/roles/${idRole}/privilege/${idPrivilege}`)
}

export function getAllModulesAvailable() {
    return axios.get(`permission/modules`)
}