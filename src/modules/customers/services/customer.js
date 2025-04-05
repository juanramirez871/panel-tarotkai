import axios from "axios"

export function getCustomers() {
    return axios.get(`customers`)
}

export function createCustomer(payload) {
    return axios.post(`customers`, payload)
}

export function deleteCustomer(idCustomer) {
    return axios.delete(`customers/${idCustomer}`)
}

export function editCustomer(idCustomer, payload) {
    return axios.put(`customers/${idCustomer}`, payload)
}

export function getCustomer(idCustomer) {
    return axios.get(`customers/${idCustomer}`)
}