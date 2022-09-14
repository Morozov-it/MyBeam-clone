import React, { useMemo } from 'react'
import { Table as AntdTable, Typography } from 'antd'
import { TableProps } from 'antd/lib/table/Table'
import styled from 'styled-components'
import getTableCustomFilter from './lib/getTableCustomFilter'
import { CustomColumnType } from './lib/types'

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
    paginate?: boolean
}

const Table = <RecordType,>({ columns, paginate, ...other }: Props<RecordType>) => {
    const customColumns = useMemo(() => {
        const p = columns?.map((col) => ({
            ...col,
            ...(col?.customFilter
                ? getTableCustomFilter(col?.dataIndex, col?.customFilter, col?.initialSliderValues)
                : null),
        }))

        return p
    }, [columns])

    const pagination = useMemo(() => {
        return paginate === true
            ? {
                showTotal: (total: number) =>
                    <Typography.Title 
                        style={{ margin: 0, lineHeight: '32px' }} 
                        level={5}>Всего элементов: {total}
                    </Typography.Title>,
                showSizeChanger: true
             }
            : paginate === false 
                ? false
                : undefined
    }, [paginate])

    return (
        <StyledTable
            {...other}
            rowKey={'id'}
            columns={customColumns}
            bordered
            pagination={pagination}
        />
    )
}

export default React.memo(Table) as typeof Table