import React from 'react'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { Checkbox, Tag, Tooltip } from 'antd'
import moment from 'moment'
import { CustomColumnType } from "@components/smartTable/lib/types"
import { Deal, SubjectDealType, StatusDealType } from "../models"
import { Customer } from '@pages/contracts/customers/models'
import parseBigValue from '@utils/parseBigValue'

//TODO: change to server catalogs
const subjectFilters: ColumnFilterItem[] = [
    { text: SubjectDealType.favor, value: 'favor' },
    { text: SubjectDealType.contracts, value: 'contracts' },
    { text: SubjectDealType.outsource, value: 'outsource' },
]

const statusFilters: ColumnFilterItem[] = [
    { text: StatusDealType.sighed, value: 'sighed' },
    { text: StatusDealType.terminated, value: 'terminated' },
    { text: StatusDealType.on_considering, value: 'on_considering' },
]

const getDealsColumns = (customers?: Customer[]): CustomColumnType<Deal>[] => ([
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        customFilter: 'search',
        align: 'center',
        fixed: 'left',
        width: 200,
    },
    {
        title: 'Номер',
        dataIndex: 'number',
        key: 'number',
        customFilter: 'search',
        align: 'center',
        width: 120,
        responsive: ['sm'],
    },
    {
        title: 'Компания',
        dataIndex: 'company',
        key: 'company',
        customFilter: 'search',
        sorter: (a, b) => a.company?.localeCompare(b.company ?? '') ?? 0,
        align: 'center',
        width: 150,
        responsive: ['sm'],
    },
    {
        title: 'Предмет договора',
        dataIndex: 'subject',
        key: 'subject',
        filters: subjectFilters,
        onFilter: (value, record) => record.subject?.indexOf(String(value)) === 0,
        sorter: (a, b) => a.subject?.localeCompare(b.subject ?? '') ?? 0,
        render: (_, record) => record.subject && SubjectDealType[record.subject],
        align: 'center',
        width: 150,
        responsive: ['md'],
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        filters: statusFilters,
        onFilter: (value, record) => record.status?.indexOf(String(value)) === 0,
        sorter: (a, b) => a.status?.localeCompare(b.status ?? '') ?? 0,
        render: (_, record) => record.status && StatusDealType[record.status],
        align: 'center',
        width: 150,
        responsive: ['md'],
    },
    {
        title: 'Цена договора',
        dataIndex: 'price',
        key: 'price',
        customFilter: 'slider',
        initialSliderValues: { min: 0, max: 1000000, step: 1000, symbol: ' ₽'},
        sorter: (a, b) => (a.price ?? 0) - (b.price ?? 0),
        render: (value) => parseBigValue(value, 3) + ' ₽',
        align: 'center',
        width: 130,
        responsive: ['lg'],
    },
    {
        title: 'Дата подписания',
        dataIndex: 'contract_date',
        key: 'contract_date',
        customFilter: 'date-picker',
        render: (value) => (!!value ? moment(value).format('L') : '-'),
        sorter: (a, b) => moment(a.contract_date).diff(b.contract_date),
        align: 'center',
        width: 150,
        responsive: ['lg'],
    },
    {
        title: 'Дата окончания',
        dataIndex: 'end_date',
        key: 'end_date',
        customFilter: 'date-picker',
        render: (value) => (!!value ? moment(value).format('L') : '-'),
        sorter: (a, b) => moment(a.end_date).diff(b.end_date),
        align: 'center',
        width: 150,
        responsive: ['lg'],
    },
    {
        title: <Tooltip title={'Автоматическое продление срока действия договора'}>Пролонгация</Tooltip>,
        dataIndex: 'auto_prolongation',
        key: 'auto_prolongation',
        render: (_, record) => <Checkbox checked={record.auto_prolongation} />,
        align: 'center',
        width: 130,
        responsive: ['xl'],
    },
    {
        title: <Tooltip title={'Указание номера договора в счете'}>Номер договора</Tooltip>,
        dataIndex: 'include_into_count',
        key: 'include_into_count',
        render: (_, record) => <Checkbox checked={record.include_into_count} />,
        align: 'center',
        width: 130,
        responsive: ['xl'],
    },
    {
        title: <Tooltip title={'Указание адреса объекта в счете'}>Адрес объекта</Tooltip>,
        dataIndex: 'address_into_count',
        key: 'address_into_count',
        render: (_, record) => <Checkbox checked={record.address_into_count} />,
        align: 'center',
        width: 130,
        responsive: ['xl'],
    },
    {
        title: 'Наименование в 1С',
        dataIndex: 'name_1c',
        key: 'name_1c',
        customFilter: 'search',
        align: 'center',
        width: 150,
        responsive: ['xl'],
    },
    {
        title: 'Заказчики',
        dataIndex: 'customers',
        key: 'customers',
        filters: customers?.map((customer) => ({ text: customer.name, value: customer.id }))
            .sort((a, b) => a.text.localeCompare(b.text)),
        onFilter: (value, record) => record.customers?.some((customer) => customer.id === value) ?? false,
        render: (_, record) => (
            <>
                {record.customers?.map((customer) => (
                    <Tooltip title={`ИНН: ${customer.INN}, КПП: ${customer.KPP}`}>
                        <Tag color="blue" key={customer.id}>
                            {customer.name}
                        </Tag>
                    </Tooltip>
                ))}
            </>
        ),
        align: 'center',
        width: 200,
        responsive: ['xl'],
    },
])

export default getDealsColumns