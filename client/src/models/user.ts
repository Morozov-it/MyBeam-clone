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

export type UserFilter = 'all' | 'user'

export enum UserFilterSelect {
    all = 'Все',
    user = 'Созданные мной'
}