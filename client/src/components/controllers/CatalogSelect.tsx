
import React from 'react'
import { Select, SelectProps } from 'antd'
import { Catalog } from '@models/base'

const CatalogSelect: React.FC<SelectProps & { catalog?: Catalog[]}> = ({ catalog, ...props }) => {
    return (
        <Select
            placeholder="выбрать"
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare((optionB!.children as unknown as string).toLowerCase())
            }
            {...props}
        >
            {catalog?.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            ))}
        </Select>
    )
}

export default React.memo(CatalogSelect)