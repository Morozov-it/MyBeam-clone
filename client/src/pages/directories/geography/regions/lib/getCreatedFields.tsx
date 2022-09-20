import React from 'react'
import { FormItemProps, Input } from 'antd'
import { BaseCatalogs } from '@models/base'
import { CatalogSelect } from '@components/controllers'

const getCreatedFields = (name: number, catalogs?: BaseCatalogs): (FormItemProps & { key: React.Key })[] => [
    {
        key: "countryId",
        name: [name, 'countryId'],
        style: { width: 150 },
        rules: [{ required: true, message: 'Выберите страну' }],
        children: <CatalogSelect catalog={catalogs?.countries} placeholder='Страна' />
    },
    {
        key: "name",
        name: [name, 'name'],
        style: { width: 200 },
        rules: [{ required: true, message: 'Введите название' }],
        children: <Input placeholder="Название" />
    },
    {
        key: "code",
        name: [name, 'code'],
        style: { width: 80 },
        rules: [{ required: true, message: 'Введите код' }],
        children: <Input placeholder="Код" />
    },
    {
        key: "prefix",
        name: [name, 'prefix'],
        style: { width: 80 },
        rules: [{ required: true, message: 'Введите префикс' }],
        children: <Input placeholder="Префикс" />
    },
    {
        key: "fullName",
        name: [name, 'fullName'],
        style: { flexGrow: 1 },
        rules: [{ required: true, message: 'Введите полное название' }],
        children: <Input placeholder="Полное название" />
    },
]

export default getCreatedFields