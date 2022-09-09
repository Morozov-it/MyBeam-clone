import React, { useMemo } from 'react'
import { Table as AntdTable } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import styled from 'styled-components'
import getTableCustomFilter from './getTableCustomFilter'
import { CustomColumnType } from './types'

const StyledTable = styled(AntdTable)`
    width: 100%;
    height: 100%;
    .row-selected,
    .row-selected:hover {
        transition: 0.1s;
    }
    .ant-table-thead > tr > th, 
    .ant-table-tbody > tr > td, 
    .ant-table tfoot > tr > th, 
    .ant-table tfoot > tr > td {
        padding: 8px 12px;
    }
` as typeof Table

type Props<RecordType> = Omit<TableProps<RecordType>, 'columns' | 'dataSource'> & {
    columns: CustomColumnType<RecordType>[]
    dataSource: RecordType[]
}

const Table = <RecordType,>({ columns, ...other }: Props<RecordType>) => {
    const customColumns = useMemo(() => {
        const p = columns?.map((col) => ({
            ...col,
            ...(col?.customFilter
                ? getTableCustomFilter(col?.dataIndex, col?.customFilter, col?.initialSliderValues)
                : null),
        }))

        return p
    }, [columns])

    return (
        <StyledTable
            {...other}
            rowKey={'id'}
            columns={customColumns}
            bordered
        />
    )
}

export default React.memo(Table) as typeof Table