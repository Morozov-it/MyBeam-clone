
import React from 'react'
import { Select, SelectProps } from 'antd'
import { StatusDealType } from '@models/contracts/deals'

const StatusSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            {...props}
            placeholder="выбрать"
            allowClear
        >
            {Object.entries(StatusDealType).map(([value, name]) => (
                <Select.Option key={value} value={value}>{name}</Select.Option>
            ))}
        </Select>
    )
}

export default React.memo(StatusSelect)