export interface User {
    name: string | null
    email: string | null
    id: number | null
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