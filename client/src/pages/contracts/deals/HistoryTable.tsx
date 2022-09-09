import SmartTable from '@components/shared/smartTable'
import { HistoryLog } from '@models/contracts'
import React from 'react'
import styled from 'styled-components'
import getHistoryColumns from './getHistoryColumns'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`

interface Props {
    data: HistoryLog[]
}

const HistoryTable: React.FC<Props> = ({ data }) => {
    return (
        <Wrapper>
            <SmartTable<HistoryLog>
                columns={getHistoryColumns()}
                dataSource={data}
                pagination={false}
                scroll={{ x: 600 }}
            />
        </Wrapper>
    )
}

export default React.memo(HistoryTable)