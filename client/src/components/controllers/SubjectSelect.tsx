
import React from 'react'
import { Select, SelectProps } from 'antd'
import { SubjectDealType } from '@models/contracts/deals'

const SubjectSelect: React.FC<SelectProps> = (props) => {
    return (
        <Select
            {...props}
            placeholder="выбрать"
            allowClear
        >
            {Object.entries(SubjectDealType).map(([value, name]) => (
                <Select.Option key={value} value={value}>{name}</Select.Option>
            ))}
        </Select>
    )
}

export default React.memo(SubjectSelect)