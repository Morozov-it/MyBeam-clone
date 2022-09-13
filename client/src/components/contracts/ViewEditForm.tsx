import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Alert, Button, Form, FormInstance, FormItemProps, Space } from 'antd'

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

interface Props<T> {
    edit: boolean
    offEdit: () => void
    selected: T | null
    getFields: (form: FormInstance<any>) => (FormItemProps & {key: React.Key})[]
    onFinish: (values: any) => void
    loading: boolean
    error: any
}

const ViewEditForm = <T,>({ edit, offEdit, selected, getFields, onFinish, loading, error }: Props<T>) => {
    const [form] = Form.useForm()
    const fields = useMemo(() => getFields(form), [form, getFields])

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
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
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
                                loading={loading}
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

export default React.memo(ViewEditForm) as typeof ViewEditForm