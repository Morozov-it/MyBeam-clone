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

interface Props {
    edit: boolean
    offEdit: () => void
    selected: any
    getFields: (form: FormInstance<any>) => (FormItemProps & {key: React.Key})[]
    onFinish: (values: any) => void
    loading: boolean
    error: any
}

const ViewEditForm: React.FC<Props> = ({ edit, offEdit, selected, getFields, onFinish, loading, error }) => {
    const [form] = Form.useForm()
    const fields = useMemo(() => getFields(form), [form, getFields])
    const buttonsLayout = useMemo(() => ({
        wrapperCol: { xs: { offset: 0 }, sm: { offset: 12 } }
    }), [])

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
                    <Form.Item {...buttonsLayout}>
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

export default React.memo(ViewEditForm)