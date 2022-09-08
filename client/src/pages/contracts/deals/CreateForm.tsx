import React, { useCallback, useMemo } from 'react'
import { 
    Alert,
    Button, 
    Form, 
    Space,
} from 'antd'
import moment, { isMoment } from 'moment'
import { useCreateDealMutation } from '@store/contracts/deals.api'
import { Deal } from '@models/deals'
import { User } from '@models/user'
import getCreatedFields from './getCreatedFields'

interface Props {
    user: User
    closeDrawer: () => void
}

const CreateDealForm: React.FC<Props> = ({ user, closeDrawer }) => {
    const [form] = Form.useForm<Partial<Deal>>()
    const [createDeal, { isLoading, error }] = useCreateDealMutation()

    const fields = useMemo(() => getCreatedFields(), [])
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

    const onReset = useCallback(() => form.resetFields(), [form])
    const onFinish = useCallback((values: Partial<Deal>) => {
        const data = {} as Omit<Deal, 'id'>;
        const dateNow = moment().toISOString();
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
        data.created_by = { ...user }
        data.created_date = dateNow
        data.updated_by = null
        data.updated_date = null
        data.attachments = null
        data.history_log = [{
            who: user,
            change_type: 'create',
            what: null,
            when: dateNow
        }]
        createDeal(data)
            .unwrap()
            .then(() => {
                closeDrawer()
                onReset()
            })
    }, [closeDrawer, createDeal, onReset, user])

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
            {fields.map((props) =>
                <Form.Item {...props} />
            )}
            {!!error &&
                <Form.Item {...tailFormItemLayout}>
                    <Alert message={JSON.stringify(error)} type="error" />
                </Form.Item>
            }
            <Form.Item {...tailFormItemLayout}>
                <Space>
                    <Button loading={isLoading} type="primary" htmlType="submit">
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

export default React.memo(CreateDealForm)