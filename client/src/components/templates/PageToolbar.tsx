import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Button, Popconfirm, Space } from 'antd'
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { CatalogSelect } from '@components/controllers'
import { UserFilter, UserFilterSelect } from '@models/user'

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
    userFilter: UserFilter
    onChangeFilter: (value: UserFilter) => void
    children?: React.ReactNode
}

const PageToolbar: React.FC<Props> = ({
    onOpenCreate,
    deleteLoading,
    deleteDisable,
    onDelete,
    userFilter,
    onChangeFilter,
    children
}) => {
    const catalog = useMemo(() =>
        Object.entries(UserFilterSelect).map(([value, name]) => ({ id: value, name }))
    ,[])
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
                {children}
            </Space>
            <CatalogSelect
                catalog={catalog}
                defaultValue={userFilter}
                style={{ width: 155 }}
                onChange={onChangeFilter}
                allowClear={false}
            />
        </Wrapper>
    )
}

export default React.memo(PageToolbar)