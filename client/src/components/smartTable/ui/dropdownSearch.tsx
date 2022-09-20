import React from 'react'
import { Button, Input, Space } from 'antd'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { SearchOutlined } from '@ant-design/icons'

const DropdownSearch = ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => {
    const handleSearch = (selectedKeys: React.Key[], confirm: () => void) => {
        confirm()
    }

    const handleReset = (clearFilters: () => void, confirm: () => void) => {
        clearFilters()
        handleSearch([], confirm)
    }

    return (
        <div style={{ padding: 8 }}>
            <Input
                placeholder={'Поиск'}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Поиск
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Сбросить
                </Button>
            </Space>
        </div>
    )
}

export default React.memo(DropdownSearch)