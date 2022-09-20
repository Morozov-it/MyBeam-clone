import React, { useCallback } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Form, FormItemProps, Space } from 'antd'

interface Props<T> {
    name: string
    getfields: (name: number) => (FormItemProps & { key: React.Key })[]
    loading: boolean
    error: any
    onFinish: (values: T) => Promise<void>
}

const DynamicForm = <T,>({ name, getfields, loading, error, onFinish }: Props<T>) => {
    const [form] = Form.useForm()
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
                    <div key={key} style={{ marginBottom: 8, display: 'flex', gap: '8px', alignItems: 'baseline' }} >
                        {getfields(name).map((props) => <Form.Item {...props} />)}
                        <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
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