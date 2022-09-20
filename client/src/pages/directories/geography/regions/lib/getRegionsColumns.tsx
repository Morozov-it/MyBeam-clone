import moment from "moment"
import { CustomColumnType } from "@components/smartTable/lib/types"
import { GeographyRegion } from "../models"
import { BaseCatalogs, Catalog } from "@models/base"

const getCatalogValue = (value: any, catalogs: Catalog[] | undefined) =>
    catalogs?.find((catalog) => catalog.id === value)?.name

const getRegionsColumns = (catalogs?: BaseCatalogs): CustomColumnType<GeographyRegion>[] => ([
    {
        title: 'Страна',
        dataIndex: 'countryId',
        key: 'countryId',
        filters: catalogs?.countries?.map((catalog) => ({ text: catalog.name, value: catalog.id })),
        onFilter: (value, record) => record.countryId === value,
        render: (value) => getCatalogValue(value, catalogs?.countries),
        sorter: (a, b) =>
            getCatalogValue(a.countryId, catalogs?.countries)?.localeCompare(
                getCatalogValue(b.countryId, catalogs?.countries) ?? '') ?? 0,
        editable: true,
        editCatalog: catalogs?.countries,
        editType: 'select',
        width: 200,
    },
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        customFilter: 'search',
        sorter: (a, b) => a.name.localeCompare(b.name),
        editable: true,
        editType: 'text',
        width: 200,
    },
    {
        title: 'Код',
        dataIndex: 'code',
        key: 'code',
        customFilter: 'search',
        sorter: (a, b) => a.code.localeCompare(b.code),
        editable: true,
        editType: 'text',
        width: 120,
    },
    {
        title: 'Префикс',
        dataIndex: 'prefix',
        key: 'prefix',
        customFilter: 'search',
        sorter: (a, b) => a.prefix.localeCompare(b.prefix),
        editable: true,
        editType: 'text',
        width: 120,
    },
    {
        title: 'Полное название',
        dataIndex: 'fullName',
        key: 'fullName',
        customFilter: 'search',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        editable: true,
        editType: 'text',
        width: 200,
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
        editable: false,
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
        editable: false,
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
        editable: false,
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
        editable: false,
    },
])

export default getRegionsColumns