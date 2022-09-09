import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Alert, Button, Form, Space } from 'antd'
import { FormLayout } from 'antd/lib/form/Form'
import moment from 'moment'
import { useUpdateDealMutation } from '@store/contracts/deals.api'
import getUpdatedFields from './getUpdatedFields'
import { Deal } from '@models/deals'
import { User } from '@models/user'
import { getChangedFields } from '@utils/getChangedFields'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .ant-form-item {
        margin-bottom: 12px;
    }
    .ant-form-item-label {
        padding: 0;
    }
`

interface Props {
    edit: boolean
    offEdit: () => void
    selected: Deal | null
    width: number
    user: User
}

const ViewEditForm: React.FC<Props> = ({ edit, offEdit, selected, width, user }) => {
    const [updateDeal, { isLoading, error }] = useUpdateDealMutation()

    //Form
    const [form] = Form.useForm()
    const fields = useMemo(() => getUpdatedFields(form), [form])
    const formLayout = useMemo(() => {
        const w = width > 850 && width < 1100
        return {
            labelCol: w ? undefined : { span: 12 },
            wrapperCol: w ? undefined : { span: 12 },
            layout:  w ? 'vertical' : 'horizontal' as FormLayout,
        }
    }, [width])

    const onFinish = (values: any) => {
        const data = { ...(selected ?? {}), ...values} as Deal
        const changedFields = getChangedFields(selected ?? {}, data)
        if (!!changedFields.length) {
            const dateNow = moment().toISOString()
            data.updated_by = user
            data.updated_date = dateNow
            data.history_log = [
                ...(selected?.history_log ?? []),
                {
                    who: user,
                    change_type: 'update',
                    when: dateNow,
                    what: `Изменил поля: ${changedFields}`
                }
            ]
            updateDeal(data)
        }
        offEdit()
    }
    const onReset = () => {
        !!selected && form.setFieldsValue(selected)
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