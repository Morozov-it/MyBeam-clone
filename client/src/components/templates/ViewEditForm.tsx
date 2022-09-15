import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Alert, Button, Form, FormInstance, FormItemProps, Space } from 'antd'
import { RecursivePartial } from '@models/index'
import { BaseCatalogs } from '@models/base'

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
    getFields: (form: FormInstance<T>, catalogs?: BaseCatalogs) => (FormItemProps<T> & { key: React.Key })[]
    onFinish: (values: T) => void
    loading: boolean
    error: any
    catalogs?: BaseCatalogs
}

const ViewEditForm = <T,>({ edit, offEdit, selected, getFields, onFinish, loading, error, catalogs }: Props<T>) => {
    const [form] = Form.useForm<T>()
    const fields = useMemo(() => getFields(form, catalogs), [catalogs, form, getFields])
    const buttonsLayout = useMemo(() => ({
        wrapperCol: { xs: { offset: 0 }, sm: { offset: 12 } }
    }), [])

    const onReset = () => {
        !!selected && form.setFieldsValue(selected as RecursivePartial<T>)
        offEdit()
    }

    useEffect(() => {
        !!selected && form.setFieldsValue(selected as RecursivePartial<T>)
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

export default React.memo(ViewEditForm) as typeof ViewEditForm