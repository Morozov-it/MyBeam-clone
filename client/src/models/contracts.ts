import type { UploadFile } from 'antd/es/upload/interface'
import { User } from "./user"

export interface IndexedValues { [key: string]: any }

export type TypeOfDoc = 'deal' | 'customer' | 'operation'
export type UserFilter = 'all' | 'user'
export type ChangeType = 'create' | 'update' | 'delete'

export enum UserFilterSelect {
    all = 'Все',
    user = 'Созданные мной'
}

export enum ChangeTypes {
    create = 'Создание',
    update = 'Обновление',
    delete = 'Удаление'
}

export interface HistoryLog {
    id: string
    who: User
    when: string
    change_type: ChangeType
    what: string[] | null
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
    history_log: HistoryLog[]
    attachments: UploadFile[] | null
}