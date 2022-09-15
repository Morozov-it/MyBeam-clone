import React from 'react'
import { Checkbox, DatePicker, FormInstance, FormItemProps, Input } from "antd"
import moment from 'moment'
import { CatalogSelect, RubInput } from '@components/controllers'
import { BaseCatalogs } from '@models/base'

const getUpdatedFields = <T,>(form: FormInstance<T>, catalogs?: BaseCatalogs): (FormItemProps<T> & { key: React.Key })[] => [
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
        children: <CatalogSelect catalog={catalogs?.subjects} onChange={(value) =>
            form.setFieldValue('subject', value === undefined ? null : value)} />
    },
    {
        key: "status",
        name: "status",
        label: "Статус",
        children: <CatalogSelect catalog={catalogs?.statuses} onChange={(value) =>
            form.setFieldValue('status', value === undefined ? null : value)} />
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
        children: <CatalogSelect catalog={catalogs?.customers} onChange={(value) =>
            form.setFieldValue('customers', value === undefined ? null : value)} />
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
        children: <DatePicker
            onChange={(value) => form.setFieldValue('contract_date', value?.toISOString() ?? null)}
            format={'L'} />,
        getValueProps: (date: string) =>  ({ value: !!date ? moment(date) : undefined }),
    },
    {
        key: "end_date",
        name: "end_date",
        label: "Дата окончания договора",
        children: <DatePicker
        onChange={(value) => form.setFieldValue('end_date', value?.toISOString() ?? null)}
            format={'L'} />,
        getValueProps: (date: string) =>  ({ value: !!date ? moment(date) : undefined }),
    },
    {
        key: "auto_prolongation",
        name: "auto_prolongation",
        label: "Автопролонгация",
        valuePropName: "checked",
        children: <Checkbox />,
    },
    {
        key: "include_into_count",
        name: "include_into_count",
        label: "№ договора в счетe",
        valuePropName: "checked",
        children: <Checkbox />,
    },
    {
        key: "address_into_count",
        name: "address_into_count",
        label: "Aдрес объекта в счетe",
        valuePropName: "checked",
        children: <Checkbox />,
    },
    {
        key: "comments",
        name: "comments",
        label: "Комментарии",
        children: <Input.TextArea />
    },
]

export default getUpdatedFields