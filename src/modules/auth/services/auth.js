import axios from "axios"

export function login(payload) {
    return axios.post(`auth/login`, payload)
}

export function getUser() {
    return axios.get(`user`)
}

export function logout() {
    return axios.post(`auth/logout`)
}