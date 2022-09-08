export interface User {
    name: string
    email: string
    id: number
}

export interface UserDTO {
    email: string
    password: string
    name?: string
}

export interface ResponseUserApi {
    accessToken: string
    user: User
}