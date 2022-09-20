import React from 'react'
import { CustomColumnType } from "./types"
import { EditButtons } from "../ui"
import { Tooltip } from 'antd'
import { HolderOutlined } from '@ant-design/icons'

interface Props<T> {
    columns: CustomColumnType<T>[]
    isEditing: (key: React.Key) => boolean
    edit: (record: T) => void
    editingKey: React.Key
    cancelEdit: () => void
    loading: boolean
    onSave: (record: T) => Promise<void>
}

export const getEditColumns = <T extends { id: React.Key },>({
    columns,
    edit,
    editingKey,
    isEditing,
    cancelEdit,
    loading,
    onSave
}: Props<T>): CustomColumnType<T>[] => [
    {
        title: <Tooltip title='Действия'><HolderOutlined /></Tooltip>,
        align: 'center',
        key: 'operations',
        width: 100,
        fixed: 'left',
        render: (_, record) =>
            <EditButtons
                edit={edit}
                cancelEdit={cancelEdit}
                editable={isEditing(record.id)}
                editingKey={editingKey}
                loading={loading}
                record={record}
                save={onSave}
            />,
    },
    ...(columns
        .map((col) => ({
            ...col,
            ...(col?.editable
                ? {
                    onCell: (record: T) => ({
                        record,
                        inputType: col?.editType,
                        catalog: col?.editCatalog,
                        dataIndex: col?.dataIndex,
                        title: col?.title,
                        editing: isEditing(record.id),
                    })
                }
                : null),
        } as CustomColumnType<T>)))
    //enable deleting non-editable columns .filter((col) => editingKey !== '' ? col.editable : true))
]