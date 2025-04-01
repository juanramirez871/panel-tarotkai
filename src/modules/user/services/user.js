import axios from "axios"

export function getUsers() {
    return axios.get(`user/all`)
}

export function getUser(id) {
    return axios.get(`user/${id}`)
}

export function createUser(payload) {
    return axios.post(`user`, payload)
}

export function deleteUser(id) {
    return axios.delete(`user/${id}`)
}

export function editUser(id, payload) {
    return axios.put(`user/${id}`, payload)
}