import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Alert, Button, Form, Space } from 'antd'
import { FormLayout } from 'antd/lib/form/Form'
import { useUpdateDealMutation } from '@store/contracts/deals.api'
import getUpdatedFields from './getUpdatedFields'
import { Deal } from '@models/deals'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`

interface Props {
    edit: boolean
    offEdit: () => void
    onEdit: () => void
    selected: Deal | null
    width: number
}

const ViewEditForm: React.FC<Props> = ({ edit, offEdit, onEdit, selected, width }) => {
    const [updateDeal, { isLoading, error }] = useUpdateDealMutation()

    //Form
    const fields = useMemo(() => getUpdatedFields(), [])
    const formLayout = useMemo(() => {
        const w = width > 850 && width < 1100
        return {
            labelCol: w ? undefined : { span: 12 },
            wrapperCol: w ? undefined : { span: 12 },
            layout:  w ? 'vertical' : 'horizontal' as FormLayout,
        }
    }, [width])
    const [form] = Form.useForm<Partial<Deal>>()
    const onFinish = async (values: Partial<Deal>) => {
        try {
            console.log(values)
            offEdit()
        } catch {}
    }
    const onReset = () => {
        form.resetFields()
        offEdit()
    }

    useEffect(() => {
        !!selected && form.setFieldsValue(selected)
    }, [form, selected])

    return (
        <Wrapper>
            <Form
                form={form}
                onFinish={onFinish}
                onReset={onReset}
                disabled={edit}
                {...formLayout}
            >
                {fields.map((props) =>
                    <Form.Item {...props} />
                )}
                {!!error &&
                    <Form.Item >
                        <Alert message={JSON.stringify(error)} type="error" />
                    </Form.Item>
                }
                {!edit &&
                    <Form.Item wrapperCol={{ offset: 12 }}>
                        <Space>
                            <Button
                                loading={isLoading}
                                htmlType='submit'
                                type="primary"
                            >
                                Сохранить</Button>
                            <Button htmlType='reset'>Отменить</Button>
                        </Space>
                    </Form.Item>
                }
            </Form>
        </Wrapper>
    )
}

export default React.memo(ViewEditForm)