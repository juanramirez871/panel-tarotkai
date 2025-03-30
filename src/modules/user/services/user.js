import axios from "axios"

export function getUsers() {
    return axios.get(`user/all`)
}

export function createUser(payload) {
    return axios.post(`user`, payload)
}