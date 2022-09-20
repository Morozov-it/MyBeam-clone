import { BaseDirectoryFields } from "@models/base"

export interface Bank extends BaseDirectoryFields {
    BIK: string
    INN: string
    dayLimit: number
    monthLimit: number
    cor_account: string
}

export interface CreateBankValues {
    banks?: {
        name: string
        BIK: string
        INN: string
        dayLimit: number
        monthLimit: number
        cor_account: string
    }[]
}