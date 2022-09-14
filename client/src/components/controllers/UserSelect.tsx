
import React from 'react'
import { Select, SelectProps } from 'antd'
import { UserFilterSelect } from '@models/user'

const UserSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            {...props}
        >
            {Object.entries(UserFilterSelect).map(([value, name]) => (
                <Select.Option key={value} value={value}>{name}</Select.Option>
            ))}
        </Select>
    )
}

export default React.memo(UserSelect)