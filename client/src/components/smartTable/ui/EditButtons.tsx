import React from 'react'
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Space, Tooltip } from "antd"

interface Props<T> {
    editable: boolean
    editingKey: React.Key
    save: (record: T) => Promise<void>
    cancelEdit: () => void
    edit: (record: T) => void
    loading: boolean
    record: T
}

const EditButtons = <T,>({ editable, edit, cancelEdit, editingKey, loading, save, record }: Props<T>) => {
    return editable ? (
        <Space>
            <Popconfirm
                title="Вы точно хотите сохранить изменения?"
                onConfirm={() => save(record)}
            >
                <Tooltip title='Сохранить'>
                    <Button loading={loading} icon={<SaveOutlined />} />
                </Tooltip>
            </Popconfirm>
            <Tooltip title='Отменить'>
                <Button onClick={cancelEdit} icon={<CloseOutlined />} />
            </Tooltip>
        </Space>
    ) : (
        <Tooltip title='Изменить'>
            <Button
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                icon={<EditOutlined />}
            />
        </Tooltip>
    )
}

export default React.memo(EditButtons) as typeof EditButtons