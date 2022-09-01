import { STORAGE_TOKEN_KEY, baseURL } from "@app/constants"
import axios from "axios"

export const accessToken = 'Bearer ' + localStorage.getItem(STORAGE_TOKEN_KEY || '')

export const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
    }
})

