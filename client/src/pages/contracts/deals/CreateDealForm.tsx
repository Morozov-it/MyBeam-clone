import React, { useMemo } from 'react'
import { 
    Alert,
    Button, 
    Checkbox, 
    DatePicker, 
    Form, 
    FormInstance, 
    Input, 
    Space,
} from 'antd'
import { DataSelect, RubInput, StatusSelect, SubjectSelect } from '@components/shared/controllers'

interface Props<T> {
    form: FormInstance<T>
    onReset: () => void
    onFinish: (values: T) => void
    loading: boolean
    error?: string
    catalog?: any[]
}

const CreateDealForm = <T,>({ form, onFinish, onReset, loading, error, catalog }: Props<T>) => {
    const formItemLayout = useMemo(() => ({
        labelCol: {
            xs: { span: 24 },
            sm: { span: 10 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    }), []) 
    const tailFormItemLayout = useMemo(() => ({
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 14,
                offset: 10,
            },
        },
    }), []) 

    return (
        <Form
            form={form}
            name="add new deal"
            onFinish={onFinish}
            onReset={onReset}
            initialValues={{
                auto_prolongation: false,
                include_into_count: false,
                address_into_count: false
            }}
            autoComplete="off"
            {...formItemLayout}
        >
            <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="number" label="Номер" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="company" label="Компания" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="subject" label="Предмет договора">
                <SubjectSelect />
            </Form.Item>
            <Form.Item name="status" label="Статус">
                <StatusSelect />
            </Form.Item>
            <Form.Item name="name_1c" label="Наименование в 1С">
                <Input />
            </Form.Item>
            <Form.Item name="customers" label="Заказчики">
                <DataSelect data={catalog ?? []}  />
            </Form.Item>
            <Form.Item name="price" label="Цена договора">
                <RubInput />
            </Form.Item>
            <Form.Item name="contract_date" label="Дата подписания договора">
                <DatePicker format={'L'} />
            </Form.Item>
            <Form.Item name="end_date" label="Дата окончания договора">
                <DatePicker format={'L'} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout} name="auto_prolongation" valuePropName="checked" >
                <Checkbox>Автопролонгация</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} name="include_into_count" valuePropName="checked">
                <Checkbox>Включить № договора в счет</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout} name="address_into_count" valuePropName="checked">
                <Checkbox>Включить адрес объекта в счет</Checkbox>
            </Form.Item>
            <Form.Item name="comments" label="Комментарии">
                <Input.TextArea />
            </Form.Item>
            {!!error &&
                <Form.Item {...tailFormItemLayout}>
                    <Alert message={error} type="error" />
                </Form.Item>
            }
            <Form.Item {...tailFormItemLayout}>
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