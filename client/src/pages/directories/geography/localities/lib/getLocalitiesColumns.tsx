import moment from "moment"
import { CustomColumnType } from "@components/smartTable/lib/types"
import { GeographyLocality } from "../models"
import { BaseCatalogs, Catalog } from "@models/base"

const getCatalogValue = (value: any, catalogs: Catalog[] | undefined) =>
    catalogs?.find((catalog) => catalog.id === value)?.name

const getCatalogFilter = (catalogs: Catalog[] | undefined) => 
    catalogs?.map((catalog) => ({ text: catalog.name, value: catalog.id }))

const getLocalitiesColumns = (catalogs?: BaseCatalogs): CustomColumnType<GeographyLocality>[] => ([
    {
        title: 'Страна',
        dataIndex: 'countryId',
        key: 'countryId',
        filters: getCatalogFilter(catalogs?.countries),
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
        title: 'Регион',
        dataIndex: 'regionId',
        key: 'regionId',
        filters: getCatalogFilter(catalogs?.regions),
        onFilter: (value, record) => record.regionId === value,
        render: (value) => getCatalogValue(value, catalogs?.regions),
        sorter: (a, b) =>
            getCatalogValue(a.regionId, catalogs?.regions)?.localeCompare(
                getCatalogValue(b.regionId, catalogs?.regions) ?? '') ?? 0,
        editable: true,
        editCatalog: catalogs?.regions,
        editType: 'select',
        width: 200,
    },
    {
        title: 'Район',
        dataIndex: 'district',
        key: 'district',
        customFilter: 'search',
        sorter: (a, b) => a.district.localeCompare(b.district),
        editable: true,
        width: 200,
    },
    {
        title: 'Префикс района',
        dataIndex: 'districtPrefix',
        key: 'districtPrefix',
        customFilter: 'search',
        align: 'center',
        sorter: (a, b) => a.districtPrefix.localeCompare(b.districtPrefix),
        editable: true,
        width: 120,
    },
    {
        title: 'Населенный пункт',
        dataIndex: 'name',
        key: 'name',
        customFilter: 'search',
        sorter: (a, b) => a.name.localeCompare(b.name),
        editable: true,
        width: 200,
    },
    {
        title: 'Префикс нас.пункта',
        dataIndex: 'namePrefix',
        key: 'namePrefix',
        customFilter: 'search',
        align: 'center',
        sorter: (a, b) => a.namePrefix.localeCompare(b.namePrefix),
        editable: true,
        width: 120,
    },
    {
        title: 'Поселение',
        dataIndex: 'area',
        key: 'area',
        customFilter: 'search',
        sorter: (a, b) => a.area?.localeCompare(b.area ?? '') ?? 0,
        editable: true,
        width: 200,
    },
    {
        title: 'Префикс поселения',
        dataIndex: 'areaPrefix',
        key: 'areaPrefix',
        customFilter: 'search',
        align: 'center',
        sorter: (a, b) => a.areaPrefix?.localeCompare(b.areaPrefix ?? '') ?? 0,
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
        editable: false,
        responsive: ['xxl'],
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
        editable: false,
        responsive: ['xxl'],
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
        editable: false,
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
        editable: false,
        responsive: ['xxl'],
    },
])

export default getLocalitiesColumns