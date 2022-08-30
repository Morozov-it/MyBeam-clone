import { ResponseUserApi, UserDTO } from "@models/user"
import { apiInstance } from "./base"

export const login = (user: UserDTO) => {
    return apiInstance.post<ResponseUserApi>('/login', user)
}
export const register = (newUser: UserDTO) => {
    return apiInstance.post<ResponseUserApi>('/register', newUser)
}