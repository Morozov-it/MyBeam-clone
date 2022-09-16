import type { UploadFile } from 'antd/es/upload/interface'
import { User } from "./user"

export interface IndexedValues { [key: string]: any }

export type TypeOfDoc = 'deal' | 'customer' | 'operation'
export type TypeOfDirectory = 'banks' |
    'companyTypes' |
    'contractStatuses' |
    'costArticles' |
    'documentTypes' |
    'geographyCountries' |
    'geographyRegions' |
    'geographyLocalities' |
    'gphServices' |
    'inOutComeArticles' |
    'jobPositions' |
    'jobStatuses' |
    'jobTypes' |
    'measures' |
    'purchaseKinds' |
    'serviceKinds' |
    'sourceOfPersons' |
    'structureLegalEntities' |
    'structureObjects' |
    'structureTerritories' |
    'structureWorkRegions' |
    'taxTypes' |
    'vacationKinds'

export type ChangeType = 'create' | 'update' | 'delete'

export interface Catalog {
    id: string | number
    name: string
}

export interface BaseCatalogs {
    [key: string]: Catalog[] | undefined
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
    what: string[]
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
    attachments: UploadFile[]
}

export interface BaseDirectoryFields {
    id: number
    name: string
    type: TypeOfDirectory
    deleted: boolean
    created_by: User
    created_date: string
    updated_by: User | null
    updated_date: string | null
}