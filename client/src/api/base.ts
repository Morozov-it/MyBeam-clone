import axios from "axios"

export const accessToken = 'Bearer ' + localStorage.getItem(process.env.REACT_APP_STORAGE_TOKEN_KEY || '')
export const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/'

export const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
    }
})

