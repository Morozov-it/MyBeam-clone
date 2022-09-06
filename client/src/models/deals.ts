import { BaseDocFields } from "./contracts"
import { Customer } from "./customers"

export enum SubjectDealType {
    favor = 'Оказание услуг',
    contracts = 'Подрядные работы',
    outsource = 'Аусорсинг'
}

export enum StatusDealType {
    sighed = 'Подписан',
    terminated = 'Расторгнут',
    on_considering = 'На рассмотрении'
}

export interface Deal extends BaseDocFields {
    number: string
    status: keyof typeof StatusDealType | null
    auto_prolongation: boolean
    include_into_count: boolean
    address_into_count: boolean
    company: string
    subject: keyof typeof SubjectDealType | null
    name_1c: string | null
    price: number | null
    customers: Customer[] | null
    contract_date: string | null
    end_date: string | null
}