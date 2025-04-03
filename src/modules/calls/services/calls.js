import axios from "axios"

export function getTypesCalls() {
    return axios.get(`type-calls`)
}

export function getTypeCall(id) {
    return axios.get(`type-calls/${id}`)
}

export function createTypeCall(payload) {
    return axios.post(`type-calls`, payload)
}

export function deleteTypeCall(id) {
    return axios.delete(`type-calls/${id}`)
}

export function editTypeCall(id, payload) {
    return axios.put(`type-calls/${id}`, payload)
}