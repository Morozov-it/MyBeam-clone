import { Moment } from 'moment'
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
    company: string | null
    subject: keyof typeof SubjectDealType | null
    name_1c: string | null
    address: string | null
    price: number | null
    customers: Customer[] | null
    contract_date: Moment | null
    end_date: Moment | null
}