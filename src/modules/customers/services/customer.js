import axios from "axios"

export function getCustomers() {
    return axios.get(`customers`)
}