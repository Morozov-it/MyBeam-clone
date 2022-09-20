import React, { useMemo } from 'react'
import styled from 'styled-components'
import SmartTable from '@components/smartTable'
import { HistoryLog } from '@models/base'
import getHistoryColumns from '../lib/getHistoryColumns'
import { Typography } from 'antd'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    .ant-table-title {
        padding: 1px 1px 1px 4px;
    }
`

interface Props {
    data?: HistoryLog[]
    title?: string
}

const HistoryView: React.FC<Props> = ({ data, title }) => {
    const dataSource = useMemo(() => data ?? [], [data])
    const scroll = useMemo(() => ({ x: 600 }), [])

    return (
        <Wrapper>
            <SmartTable<HistoryLog>
                title={() => <Typography.Title level={5}>{title}</Typography.Title>}
                columns={getHistoryColumns()}
                dataSource={dataSource}
                pagination={false}
                scroll={scroll}
            />
        </Wrapper>
    )
}

export default React.memo(HistoryView)