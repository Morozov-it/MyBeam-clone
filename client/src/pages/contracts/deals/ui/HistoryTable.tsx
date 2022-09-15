import React, { useMemo } from 'react'
import styled from 'styled-components'
import SmartTable from '@components/smartTable'
import { HistoryLog } from '@models/base'
import getHistoryColumns from '../lib/getHistoryColumns'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`

interface Props {
    data?: HistoryLog[]
}

const HistoryTable: React.FC<Props> = ({ data }) => {
    const dataSource = useMemo(() => data ?? [], [data])
    const scroll = useMemo(() => ({ x: 600 }), [])

    return (
        <Wrapper>
            <SmartTable<HistoryLog>
                columns={getHistoryColumns()}
                dataSource={dataSource}
                pagination={false}
                scroll={scroll}
            />
        </Wrapper>
    )
}

export default React.memo(HistoryTable)