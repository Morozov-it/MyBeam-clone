import React from 'react'
import styled from 'styled-components'
import { Button, Popconfirm, Space } from 'antd'
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { UserSelect } from '@components/controllers'
import { UserFilter } from '@models/user'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
`

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
        <Wrapper>
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
        </Wrapper>
    )
}

export default React.memo(Toolbar)