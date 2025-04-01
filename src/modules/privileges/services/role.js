import axios from "axios"

export function getRoles() {
    return axios.get(`role/all`)
}