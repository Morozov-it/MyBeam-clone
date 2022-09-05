import React from 'react'
import { ColumnType } from 'antd/es/table'
import { CalendarOutlined, SearchOutlined, SlidersOutlined } from '@ant-design/icons'
import { DataIndex } from 'rc-table/lib/interface'
import { Moment } from 'moment'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { DropdownDatePicker, DropdownSlider, DropdownSearch } from './ui'
import { CustomTableFilter, InitialSliderValues } from './types'
import recursionObjectSearch from '@utils/recursionObjectSearch'

const onSearchFilter =
    (dataIndex?: DataIndex): ColumnType<any>['onFilter'] =>
    (value, record) => {
        const string = recursionObjectSearch(record, dataIndex ?? '').toLowerCase()

        return !!value
            ? string?.includes(value.toString().toLowerCase())
            : true
    }

const onDatePickerFilter =
    (dataIndex?: DataIndex): ColumnType<any>['onFilter'] =>
    (value, record) => {
        const date = recursionObjectSearch(record, dataIndex ?? '')

        return !!value
            ? (value as unknown as Moment[])[0]?.isSameOrBefore(date) &&
                    (value as unknown as Moment[])[1]?.isSameOrAfter(date)
            : true
    }

const onSliderFilter =
    (dataIndex?: DataIndex): ColumnType<any>['onFilter'] =>
    (value, record) => {
        const number = recursionObjectSearch(record, dataIndex ?? '')

        return !!value
            ? (value as unknown as number[])[0] <= Number(number) && Number(number) <= (value as unknown as number[])[1]
            : true
    }

const getTableCustomFilter = (
    dataIndex?: DataIndex,
    customFilter?: CustomTableFilter,
    initialSliderValues?: InitialSliderValues,
): ColumnType<any> => {
    switch (customFilter) {
        case 'date-picker': 
            return {
                filterDropdown: (props: FilterDropdownProps) => <DropdownDatePicker {...props} />,
                filterIcon: <CalendarOutlined />,
                onFilter: onDatePickerFilter(dataIndex),
            }
        case 'slider':
            return {
                filterDropdown: (props: FilterDropdownProps) => <DropdownSlider {...props} {...initialSliderValues} />,
                filterIcon: <SlidersOutlined />,
                onFilter: onSliderFilter(dataIndex),
            }
        case 'search':
            return {
                filterDropdown: (props: FilterDropdownProps) => <DropdownSearch {...props} />,
                filterIcon: <SearchOutlined />,
                onFilter: onSearchFilter(dataIndex),
            }
        default:
            return {}
    }
}

export default getTableCustomFilter
