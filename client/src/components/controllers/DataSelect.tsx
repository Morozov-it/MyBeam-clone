
import React from 'react'
import { Select, SelectProps } from 'antd'

const DataSelect: React.FC<SelectProps & { data?: Array<{ id: number, name: string }>}> = ({ data, ...props }) => {
    return (
        <Select
            {...props}
            placeholder="выбрать"
            allowClear
        >
            {data?.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            ))}
        </Select>
    )
}

export default React.memo(DataSelect)