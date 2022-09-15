import React from 'react'
import { 
    Checkbox, 
    DatePicker, 
    FormInstance, 
    FormItemProps, 
    Input, 
} from 'antd'
import { RubInput, CatalogSelect } from '@components/controllers'
import { BaseCatalogs } from '@models/base'

const getCreatedFields = <T,>(form: FormInstance<T>, catalogs?: BaseCatalogs): (FormItemProps<T> & { key: React.Key })[] => [
    {
        key: "name",
        name: "name",
        label: "Название",
        rules: [{ required: true }],
        children: <Input />
    },
    {
        key: "number",
        name: "number",
        label: "Номер",
        rules: [{ required: true }],
        children: <Input />
    },
    {
        key: "company",
        name: "company",
        label: "Компания",
        rules: [{ required: true }],
        children: <Input />
    },
    {
        key: "subject",
        name: "subject",
        label: "Предмет договора",
        children: <CatalogSelect catalog={catalogs?.subjects} />
    },
    {
        key: "status",
        name: "status",
        label: "Статус",
        children: <CatalogSelect catalog={catalogs?.statuses} />
    },
    {
        key: "name_1c",
        name: "name_1c",
        label: "Наименование в 1С",
        children: <Input />
    },
    {
        key: "customers",
        name: "customers",
        label: "Заказчики",
        children: <CatalogSelect catalog={catalogs?.customers} mode="multiple" />
    },
    {
        key: "price",
        name: "price",
        label: "Цена договора",
        children: <RubInput />
    },
    {
        key: "contract_date",
        name: "contract_date",
        label: "Дата подписания договора",
        children: <DatePicker format={'L'} />
    },
    {
        key: "end_date",
        name: "end_date",
        label: "Дата окончания договора",
        children: <DatePicker format={'L'} />
    },
    {
        key: "auto_prolongation",
        name: "auto_prolongation",
        valuePropName: "checked",
        children: <Checkbox>Автопролонгация</Checkbox>,
        wrapperCol: { xs: { offset: 0 }, sm: { offset: 12 } },
    },
    {
        key: "include_into_count",
        name: "include_into_count",
        valuePropName: "checked",
        children: <Checkbox>Включить № договора в счет</Checkbox>,
        wrapperCol: { xs: { offset: 0 }, sm: { offset: 12 } },
    },
    {
        key: "address_into_count",
        name: "address_into_count",
        valuePropName: "checked",
        children: <Checkbox>Включить адрес объекта в счет</Checkbox>,
        wrapperCol: { xs: { offset: 0 }, sm: { offset: 12 } },
    },
    {
        key: "comments",
        name: "comments",
        label: "Комментарии",
        children: <Input.TextArea />
    },
]

export default getCreatedFields