/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { Alert, Button, Drawer, Form, Popconfirm, Space, Typography } from 'antd'
import moment, { isMoment } from 'moment'
import SmartTable from '@components/shared/smartTable'
import { Deal } from '@models/deals'
import { getDealsColumns } from './getDealsColumns'
import useWindowSize from '@utils/hooks/useWindowSize'
import { useAppSelector } from '@store/store'
import CreateDealForm from './CreateDealForm'
import { useCreateDealMutation, useDeleteDealMutation, useLazyFetchDealsQuery } from '@store/contracts/deals.api'
import { UserFilter } from '@models/contracts'
import { UserSelect } from '@components/shared/controllers'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
    }
`

const DealsPage: React.FC = () => {
    const { id, email, name } = useAppSelector((state) => state.user)
    const { width } = useWindowSize()
    const [filter, setFilter] = useState<UserFilter>('all')
    const params = useCallback(() => filter === 'user' ? { userId: id } : {}, [filter])
    const [fetchDeals, { data: deals, isFetching, isLoading, error }] = useLazyFetchDealsQuery()
    const [createDeal, { isLoading: createDealLoading, error: createDealError }] = useCreateDealMutation()
    const [deleteDeal, { isLoading: deleteDealLoading, error: deleteDealError }] = useDeleteDealMutation()

    useEffect(() => {
        fetchDeals(params())
    }, [params])

    //Drawer
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const showDrawer = useCallback(() => setOpenDrawer(true), [])
    const closeDrawer = useCallback(() => setOpenDrawer(false), [])

    // Table
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }, [])
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    //Form
    const [form] = Form.useForm<Partial<Deal>>()
    const onFormReset = useCallback(() => form.resetFields(), [form])
    const onCreateDeal = useCallback((values: Partial<Deal>) => {
        const data = {} as Omit<Deal, 'id'>
        (Object.keys(values) as Array<keyof Deal>).forEach((key) => {
            if (isMoment(values[key])) {
                //@ts-ignore
                data[key] = (values[key] as unknown as Moment).toISOString()
            } else {
                //@ts-ignore
                data[key] = values[key] === undefined ? null : values[key]
            }
        })
        data.type = 'deal'
        data.deleted = false
        data.created_by = { id, email, name }
        data.created_date = moment().toISOString()
        data.updated_by = null
        data.updated_date = null
        createDeal(data)
            .unwrap()
            .then(() => {
                closeDrawer()
                onFormReset()
            })
    }, [email, id, name])

    const onDeleteDeal = useCallback((id: number) => deleteDeal(id), []) 
    const onGroupDelete = useCallback(() => {
        Promise.all(selectedRowKeys.map((id) => onDeleteDeal(Number(id)).unwrap()))
            .then(() => {
                setSelectedRowKeys([])
                fetchDeals(params())
            })
    }, [selectedRowKeys])

    return (
        <Wrapper>
            <div className='toolbar'>
                <Space wrap>
                    <Button onClick={() => showDrawer()}>
                        <FileAddOutlined />
                        <span>Создать</span>
                    </Button>
                    <Popconfirm
                        disabled={!selectedRowKeys.length}
                        placement="bottom"
                        title="Вы точно хотите это удалить?"
                        onConfirm={onGroupDelete}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button
                            loading={deleteDealLoading}
                            disabled={!selectedRowKeys.length}>
                            <DeleteOutlined />
                            <span>Удалить</span>
                        </Button>
                    </Popconfirm>
                </Space>
                <Space wrap>
                    <UserSelect defaultValue={filter} style={{ width: 155 }} onChange={(value) => setFilter(value)} />
                    <Typography.Title level={5}>Количество элементов: {deals?.length}</Typography.Title>
                </Space>
            </div>
            <SmartTable<Deal>
                columns={getDealsColumns()}
                dataSource={deals ?? []}
                rowSelection={rowSelection}
                loading={isFetching || isLoading}
            />
            {!!error && <Alert message={JSON.stringify(error)} type="error" />}
            {!!deleteDealError && <Alert message={JSON.stringify(deleteDealError)} type="error" />}

            <Drawer
                title="Создать договор"
                placement="right"
                onClose={closeDrawer}
                open={openDrawer}
                width={width > 1500
                    ? width / 3
                    : width > 800 ? width / 2 : width
                }
            >
                <CreateDealForm<Partial<Deal>>
                    form={form}
                    onFinish={onCreateDeal}
                    onReset={onFormReset}
                    loading={createDealLoading}
                    error={createDealError && JSON.stringify(createDealError)}
                />
            </Drawer>
        </Wrapper>
    )
}

export default DealsPage