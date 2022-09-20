/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Form, FormItemProps, Space } from 'antd'
import { BaseCatalogs } from '@models/base'
import styled from 'styled-components'

const Wrapper = styled.div<{
    width: number
}>`
    margin-bottom: 8;
    display: flex;
    gap: 8px;
    align-items: baseline;
    flex-wrap: ${({ width }) => width < 800 ? 'wrap' : 'nowrap'};
`

interface Props<T> {
    name: string
    getfields: (name: number, catalogs?: BaseCatalogs) => (FormItemProps & { key: React.Key })[]
    loading: boolean
    error: any
    onFinish: (values: T) => Promise<void>
    width: number
    catalogs?: BaseCatalogs
}

const DynamicForm = <T,>({ name, getfields, loading, error, onFinish, width, catalogs }: Props<T>) => {
    const [form] = Form.useForm()
    const formFields = useCallback((name: number) => getfields(name, catalogs), [catalogs])

    const onReset = useCallback(() => form.resetFields(), [form])

    const handleFinish = useCallback((values: T) => {
        onFinish(values).then(onReset)
    }, [onFinish, onReset])
    
    return (
        <Form
            form={form}
            onFinish={handleFinish}
            onReset={onReset}
            autoComplete="off"
        >
            <Form.List name={name}>
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name }) => (
                    <Wrapper width={width} key={key}>
                        {formFields(name).map((props) => <Form.Item {...props} />)}
                        <MinusCircleOutlined onClick={() => remove(name)} />
                    </Wrapper>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Добавить
                        </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
            {!!error && <Alert style={{marginBottom: '8px'}} message={error} type="error" />}
            <Form.Item>
                <Space>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button htmlType="reset">
                        Очистить
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default React.memo(DynamicForm) as typeof DynamicForm