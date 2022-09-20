import React from 'react'
import { FormItemProps, Input } from 'antd'

const getCreatedFields = (name: number): (FormItemProps & { key: React.Key })[] => [
    {
        key: "name",
        name: [name, 'name'],
        style: { flexGrow: 1 },
        rules: [{ required: true, message: 'Введите название' }],
        children: <Input placeholder="Название" />
    },
    {
        key: "code",
        name: [name, 'code'],
        rules: [{ required: true, message: 'Введите код' }],
        children: <Input placeholder="Код" />
    },
]

export default getCreatedFields