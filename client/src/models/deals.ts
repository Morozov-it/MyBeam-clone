import { BaseDocFields, IndexedValues } from "./contracts"
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

export const FieldNames: IndexedValues = {
    name: 'Название',
    comments: 'Комментарии',
    number: 'Номер',
    status: 'Статус',
    auto_prolongation: 'Автопролонгация',
    include_into_count: '№ договора в счетe',
    address_into_count: 'Aдрес объекта в счетe',
    company: 'Компания',
    subject: 'Предмет договора',
    name_1c: 'Наименование в 1С',
    price: 'Цена договора',
    customers: 'Заказчики',
    contract_date: 'Дата подписания договора',
    end_date: 'Дата окончания договора',
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