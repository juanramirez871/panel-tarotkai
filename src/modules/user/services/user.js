import axios from "axios"

export function getUsers() {
    return axios.get(`user/all`)
}