import React from 'react'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import moment from 'moment'
import { Tag } from 'antd'
import { CustomColumnType } from "@components/smartTable/lib/types"
import { ChangeTypes, HistoryLog } from '@models/base'
import { DealFieldNames } from '../models'

const changeTypeFilters: ColumnFilterItem[] = [
    { text: ChangeTypes.create, value: 'create' },
    { text: ChangeTypes.update, value: 'update' },
    { text: ChangeTypes.delete, value: 'delete' },
]

const getHistoryColumns = (): CustomColumnType<HistoryLog>[] => ([
    {
        title: 'Имя пользователя',
        dataIndex: ['who', 'name'],
        key: 'who',
        customFilter: 'search',
        align: 'center',
        width: 140
    },
    {
        title: 'Дата действия',
        dataIndex: 'when',
        key: 'when',
        customFilter: 'date-picker',
        render: (value) => (!!value ? moment(value).format('L LT') : '-'),
        sorter: (a, b) => moment(a.when).diff(b.when),
        defaultSortOrder: 'descend',
        align: 'center',
        width: 140
    },
    {
        title: 'Тип действия',
        dataIndex: 'change_type',
        key: 'change_type',
        filters: changeTypeFilters,
        onFilter: (value, record) => record.change_type.indexOf(String(value)) === 0,
        sorter: (a, b) => a.change_type.localeCompare(b.change_type),
        render: (_, record) => ChangeTypes[record.change_type],
        align: 'center',
        width: 140
    },
    {
        title: 'Изменены поля',
        dataIndex: 'what',
        key: 'what',
        render: (_, record) => Array.isArray(record.what) && record.what.map((field, i) => (
                <Tag color="blue" key={i} style={{ margin: '2px'}}>
                    {DealFieldNames[field]}
                </Tag>
            )
        ),
        align: 'center',
        width: 200
    },
])

export default getHistoryColumns