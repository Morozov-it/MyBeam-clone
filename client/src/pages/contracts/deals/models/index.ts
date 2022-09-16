import { BaseDocFields, IndexedValues } from "@models/base"
import { Customer } from "@pages/contracts/customers/models"

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

export const DealFieldNames: IndexedValues = {
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
    company: string
    auto_prolongation: boolean
    include_into_count: boolean
    address_into_count: boolean
    status: keyof typeof StatusDealType | null
    subject: keyof typeof SubjectDealType | null
    name_1c: string | null
    price: number | null
    contract_date: string | null
    end_date: string | null
    customers: Customer[]
}