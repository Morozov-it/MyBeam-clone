import React, { useCallback, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Select } from 'antd'

interface Props {
    catalog: { value: string, key: string }[]
    onSelect: (key: string) => void
}

const SearchDrop: React.FC<Props> = ({ catalog, onSelect }) => {
    const [value, setValue] = useState<string | null>(null)
    const [options, setOptions] = useState<{ value: string, key: string }[]>(catalog)

    const onChange = useCallback((e: string) => setValue(e), [])

    const onSearch = useCallback((e: string) => {
        setOptions(!!e
            ? catalog
                .filter(({ value }) => value.toLowerCase().includes(e.toLowerCase()))
            : catalog
        )
    }, [catalog])

    return (
        <Select
            showSearch
            value={value}
            placeholder={<><SearchOutlined /> поиск</>}
            style={{ width: 200 }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={onSearch}
            onSelect={(key: string) => {
                onSelect(key)
                setValue(null)
                setOptions(catalog)
            }}
            onChange={onChange}
            notFoundContent={null}
        >
            {
                options.map(({ key, value }) => (
                    <Select.Option key={key}>
                        {value}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

export default React.memo(SearchDrop)