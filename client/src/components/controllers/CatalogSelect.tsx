
import React from 'react'
import { Select, SelectProps } from 'antd'
import { Catalog } from '@models/base'

const CatalogSelect: React.FC<SelectProps & { catalog?: Catalog[]}> = ({ catalog, ...props }) => {
    return (
        <Select
            placeholder="выбрать"
            allowClear
            {...props}
        >
            {catalog?.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            ))}
        </Select>
    )
}

export default React.memo(CatalogSelect)