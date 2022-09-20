import React from 'react'
import { FormItemProps, Input, InputNumber } from 'antd'

const getCreatedFields = (name: number): (FormItemProps & { key: React.Key })[] => [
    {
        key: "name",
        name: [name, 'name'],
        style: { minWidth: 150, flexGrow: 1 },
        rules: [{ required: true, message: 'Введите название' }],
        children: <Input placeholder="Название" />
    },
    {
        key: "BIK",
        name: [name, 'BIK'],
        style: { width: 100 },
        rules: [{ required: true, message: 'Введите данные' }],
        children: <Input placeholder="БИК" />
    },
    {
        key: "INN",
        name: [name, 'INN'],
        style: { width: 100 },
        rules: [{ required: true, message: 'Введите данные' }],
        children: <Input placeholder="ИНН" />
    },
    {
        key: "dayLimit",
        name: [name, 'dayLimit'],
        style: { width: 100 },
        rules: [{ required: true, message: 'Введите данные' }],
        children: <InputNumber  placeholder="Дневной лимит" />
    },
    {
        key: "monthLimit",
        name: [name, 'monthLimit'],
        style: { width: 100 },
        rules: [{ required: true, message: 'Введите данные' }],
        children: <InputNumber placeholder="Месячный лимит" />
    },
    {
        key: "cor_account",
        name: [name, 'cor_account'],
        style: { width: 200 },
        rules: [{ required: true, message: 'Введите данные' }],
        children: <Input placeholder="Корсчет" />
    },
]

export default getCreatedFields