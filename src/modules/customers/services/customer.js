import axios from "axios"

export function getCustomers() {
    return axios.get(`customers`)
}

export function createCustomers(payload) {
    return axios.post(`customers`, payload)
}

export function deleteCustomers(idCustomer) {
    return axios.delete(`customers/${idCustomer}`)
}

export function editCustomers(idCustomer, payload) {
    return axios.put(`customers/${idCustomer}`, payload)
}