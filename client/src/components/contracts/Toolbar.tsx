import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { UserSelect } from '@components/shared/controllers'
import { UserFilter } from '@models/contracts'
import { Button, Popconfirm, Space } from 'antd'
import React from 'react'

interface Props {
    onOpenCreate: () => void
    deleteLoading: boolean
    deleteDisable: boolean
    onDelete: () => void
    filter: UserFilter
    onChangeFilter: (value: UserFilter) => void
}

const Toolbar: React.FC<Props> = ({
    onOpenCreate,
    deleteLoading,
    deleteDisable,
    onDelete,
    filter,
    onChangeFilter,
}) => {
    return (
        <div className="toolbar">
            <Space wrap>
                <Button onClick={onOpenCreate}>
                    <FileAddOutlined />
                    <span>Создать</span>
                </Button>
                <Popconfirm
                    disabled={deleteDisable}
                    placement="bottom"
                    title="Вы точно хотите это удалить?"
                    onConfirm={onDelete}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button
                        loading={deleteLoading}
                        disabled={deleteDisable}>
                        <DeleteOutlined />
                        <span>Удалить</span>
                    </Button>
                </Popconfirm>
            </Space>
            <UserSelect defaultValue={filter} style={{ width: 155 }} onChange={onChangeFilter} />
        </div>
    )
}

export default React.memo(Toolbar)