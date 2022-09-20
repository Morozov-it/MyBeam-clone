/* eslint-disable no-useless-computed-key */
import React from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'
import { FilterDropdownProps } from 'antd/lib/table/interface'

const DropdownDatePicker = (props: FilterDropdownProps) => {
    const handleChange = (value: any) => {
        props.setSelectedKeys([value])
        props.confirm()
        if (!value && props.clearFilters) {
            props.clearFilters()
            props.confirm()
        }
    }

    return (
        <DatePicker.RangePicker
            format="DD.MM.YYYY"
            placeholder={['от', 'до']}
            onChange={handleChange}
            ranges={{
                ['сегодня']: [moment(), moment()],
                ['неделя']: [moment(), moment().add(1, 'week')],
                ['месяц']: [moment(), moment().add(1, 'month')],
                ['год']: [moment(), moment().add(1, 'year')],
            }}
        />
    )
}

export default React.memo(DropdownDatePicker)
