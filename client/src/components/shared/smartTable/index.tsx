import React, { useMemo } from 'react'
import { Table as AntdTable, Typography } from 'antd'
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
            pagination={{
                showTotal: (total) =>
                    <Typography.Title 
                        style={{ margin: 0, lineHeight: '32px' }} 
                        level={5}>Всего элементов: {total}
                    </Typography.Title>,
                showSizeChanger: true
            }}
        />
    )
}

export default React.memo(Table) as typeof Table