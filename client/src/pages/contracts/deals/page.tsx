import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Space, Typography } from 'antd'
import moment, { isMoment } from 'moment'
import SmartTable from '@components/shared/smartTable'
import { Deal } from '@models/deals'
import { getDealsColumns } from './getDealsColumns'
import useWindowSize from '@utils/hooks/useWindowSize'
import { useAppSelector } from '@store/store'
import CreateDealForm from './CreateDealForm'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const DealsPage: React.FC = () => {
    const { id, email, name } = useAppSelector((state) => state.user)
    const { width } = useWindowSize()

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    const showDrawer = useCallback(() => setOpenDrawer(true), [])
    const closeDrawer = useCallback(() => setOpenDrawer(false), [])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const [form] = Form.useForm<Partial<Deal>>()
    const onFormReset = useCallback(() => form.resetFields(), [form])
    const onCreateDeal = (values: Partial<Deal>) => {
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
        console.log(data)
    }

    return (
        <Wrapper>
            <div className='toolbar'>
                <Space>
                    <Button onClick={() => showDrawer()}>
                        <FileAddOutlined />
                        <span>Создать</span>
                    </Button>
                    <Button>
                        <DeleteOutlined />
                        <span>Удалить</span>
                    </Button>
                </Space>
                <Typography.Title level={5}>Количество элементов</Typography.Title>
            </div>
            <SmartTable<Deal>
                columns={getDealsColumns()}
                dataSource={[]}
                rowSelection={rowSelection}
            />
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
                />
            </Drawer>
        </Wrapper>
    )
}

export default DealsPage