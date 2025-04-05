import axios from "axios"

export function getCustomers() {
    return axios.get(`customers`)
}

export function createCustomers(payload) {
    return axios.post(`customers`, payload)
}