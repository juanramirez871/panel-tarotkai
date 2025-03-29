import axios from "axios"

export function login(email, password) {
    return axios.post(`auth/login`, { email, password })
}