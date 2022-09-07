import { User } from "./user"

export type TypeOfDoc = 'deal' | 'customer' | 'operation'

export type UserFilter = 'all' | 'user'

export enum UserFilterSelect {
    all = 'Все',
    user = 'Созданные мной'
}

export interface BaseDocFields {
    id: number
    name: string
    comments: string | null
    type: TypeOfDoc
    deleted: boolean
    created_by: User
    created_date: string
    updated_by: User | null
    updated_date: string | null
}