import React from 'react'
import { CustomColumnType } from "./types"
import { EditButtons } from "../ui"

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
}: Props<T>): CustomColumnType<T>[] => 
    columns.map((col) => ({
        ...col,
        ...(col?.editable
            ? {
                onCell: (record: T) => ({
                    record,
                    inputType: 'text',
                    dataIndex: col?.dataIndex,
                    title: col?.title,
                    editing: isEditing(record.id),
                })
            }
            : null),
    } as CustomColumnType<T>)).concat({
        title: 'Действия',
        key: 'operations',
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
        align: 'center',
        width: 100,
    })