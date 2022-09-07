import { STORAGE_TOKEN_KEY, baseURL } from "@app/constants"
import axios from "axios"

export const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const authInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_TOKEN_KEY || ''),
    }
})

