import moment from "moment"
import { CustomColumnType } from "@components/smartTable/lib/types"
import { GeographyCountry } from "../models"

const getCountriesColumns = (): CustomColumnType<GeographyCountry>[] => ([
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        customFilter: 'search',
        sorter: (a, b) => a.name.localeCompare(b.name),
        editable: true,
        width: 300,
    },
    {
        title: 'Код',
        dataIndex: 'code',
        key: 'code',
        customFilter: 'search',
        align: 'center',
        sorter: (a, b) => a.code.localeCompare(b.code),
        editable: true,
        width: 120,
    },
    {
        title: 'Кем создано',
        dataIndex: ['created_by', 'name'],
        key: 'created_by',
        customFilter: 'search',
        align: 'center',
        sorter: (a, b) => a.created_by.name.localeCompare(b.created_by.name),
        width: 150,
        responsive: ['xl'],
    },
    {
        title: 'Когда создано',
        dataIndex: 'created_date',
        key: 'created_date',
        customFilter: 'date-picker',
        render: (value) => (!!value ? moment(value).format('L') : '-'),
        sorter: (a, b) => moment(a.created_date).diff(b.created_date),
        align: 'center',
        width: 150,
        responsive: ['xl'],
    },
    {
        title: 'Кем изменено',
        dataIndex: ['updated_by', 'name'],
        key: 'updated_by',
        customFilter: 'search',
        align: 'center',
        sorter: (a, b) => a.updated_by?.name.localeCompare(b.updated_by?.name ?? '') ?? 0,
        render: (value) => value ?? '-',
        width: 150,
        responsive: ['xxl'],
    },
    {
        title: 'Когда изменено',
        dataIndex: 'updated_date',
        key: 'updated_date',
        customFilter: 'date-picker',
        render: (value) => (!!value ? moment(value).format('L LT') : '-'),
        sorter: (a, b) => moment(a.updated_date).diff(b.updated_date),
        align: 'center',
        width: 150,
        responsive: ['xxl'],
    },
])

export default getCountriesColumns