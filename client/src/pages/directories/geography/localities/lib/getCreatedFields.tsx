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
        key: "regionId",
        name: [name, 'regionId'],
        style: { width: 150 },
        rules: [{ required: true, message: 'Выберите регион' }],
        children: <CatalogSelect catalog={catalogs?.regions} placeholder='Регион' />
    },
    {
        key: "district",
        name: [name, 'district'],
        style: { width: 150 },
        rules: [{ required: true, message: 'Введите район' }],
        children: <Input placeholder="Район" />
    },
    {
        key: "districtPrefix",
        name: [name, 'districtPrefix'],
        style: { width: 80 },
        rules: [{ required: true, message: 'Введите префикс' }],
        children: <Input placeholder="Префикс р-на" />
    },
    {
        key: "name",
        name: [name, 'name'],
        style: { width: 200, flexGrow: 1 },
        rules: [{ required: true, message: 'Введите населенный пункт' }],
        children: <Input placeholder="Населенный пункт" />
    },
    {
        key: "namePrefix",
        name: [name, 'namePrefix'],
        style: { width: 80 },
        rules: [{ required: true, message: 'Введите префикс' }],
        children: <Input placeholder="Префикс пункта" />
    },
    {
        key: "area",
        name: [name, 'area'],
        style: { width: 150 },
        children: <Input placeholder="Поселение" />
    },
    {
        key: "areaPrefix",
        name: [name, 'areaPrefix'],
        style: { width: 80 },
        children: <Input placeholder="Префикс поселения" />
    },
]

export default getCreatedFields