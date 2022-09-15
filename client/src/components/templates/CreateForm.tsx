import React, { useCallback, useMemo } from 'react'
import { 
    Alert,
    Button, 
    Form, 
    Space, 
    FormInstance, 
    FormItemProps
} from 'antd'
import { BaseCatalogs } from '@models/base'

interface Props<T> {
    getFields: (form: FormInstance<T>, catalogs?: BaseCatalogs) => (FormItemProps<T> & {key: React.Key})[]
    onFinish: (values: T) => Promise<void>
    loading: boolean
    error: any
    initialValues?: Partial<T>
    catalogs?: BaseCatalogs
}

const CreateDealForm = <T,>({ getFields, onFinish, error, loading, initialValues, catalogs }: Props<T>) => {
    const [form] = Form.useForm<T>()
    const fields = useMemo(() => getFields(form, catalogs), [catalogs, form, getFields])
    const buttonsLayout = useMemo(() => ({
        wrapperCol: { xs: { offset: 0 }, sm: { offset: 12 } }
    }), [])

    const onReset = useCallback(() => form.resetFields(), [form])

    const handleFinish = useCallback((values: T) => {
        onFinish(values).then(onReset)
    }, [onFinish, onReset])

    return (
        <Form
            form={form}
            onFinish={handleFinish}
            onReset={onReset}
            initialValues={initialValues}
            autoComplete="off"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
        >
            {fields.map((props) =>
                <Form.Item {...props} />
            )}
            {!!error &&
                <Form.Item>
                    <Alert message={JSON.stringify(error)} type="error" />
                </Form.Item>
            }
            <Form.Item {...buttonsLayout}>
                <Space>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Создать
                    </Button>
                    <Button htmlType="reset">
                        Очистить
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default React.memo(CreateDealForm) as typeof CreateDealForm