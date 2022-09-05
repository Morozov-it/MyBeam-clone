import React, { useState } from 'react'
import styled from 'styled-components'
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import SmartTable from '@components/shared/smartTable'
import { Deal } from '@models/deals'
import { Button, Typography } from 'antd'
import { getDealsColumns } from './getDealsColumns'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .buttons {
        display: flex;
        gap: 8px;
    }
`

const DealsPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <Wrapper>
            <div className='toolbar'>
                <div className='buttons'>
                    <Button>
                        <FileAddOutlined />
                        <span>Создать</span>
                    </Button>
                    <Button>
                        <DeleteOutlined />
                        <span>Удалить</span>
                    </Button>
                </div>
                <Typography.Title level={5}>Количество элементов</Typography.Title>
            </div>
            <SmartTable<Deal>
                columns={getDealsColumns()}
                dataSource={[]}
                rowSelection={rowSelection}
            />
        </Wrapper>
    )
}

export default DealsPage