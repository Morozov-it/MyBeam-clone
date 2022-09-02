import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
    CheckCircleOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    LoginOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Button, Form, Input, Modal, Typography } from 'antd'
import { AxiosError } from 'axios'
import logo from '@app/images/logo.png'
import { Routes } from '@app/routes'
import PageLayout from '@components/layout/PageLayout'
import { register } from '@api/user'

const Wrapper = styled.div`
    flex-basis: 350px;
    background: white;
    padding: 20px;
    margin: 0 10px;
    box-shadow: 1px 1px 10px black;
    border-radius: 2px;

    .title {
        text-align: center;
        margin-bottom: 30px;
    }

    .form-item, .form-button {
        width: 100%;
    }
    .login {
        text-align: center;
    }
`

interface FormValues {
    name: string
    email: string
    password: string
}

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const confirm = (name: string) => {
        Modal.confirm({
            title: `Пользователь с именем ${name} успешно зарегистрирован!`,
            icon: <CheckCircleOutlined />,
            content: 'Можете войти, чтобы начать работу или отменить вход',
            okText: 'Войти',
            cancelText: 'Отмена',
            onOk: () => navigate(Routes.LOGIN),
        })
    }

    const onFinish = async ({ name, email, password }: FormValues) => {
        try {
            setError('')
            setLoading(true)
            const response = await register({ name, email, password })
            confirm(response.data.user.name as string)
        } catch (e) {
            setError((e as AxiosError)?.response?.data as string)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageLayout>
            <Wrapper>
                <h1 className="title">
                    <img src={logo} alt="logo" />
                </h1>
                <Form<FormValues>
                    autoComplete="off"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        className='form-item'
                        name="name"
                        rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя" />
                    </Form.Item>
                    <Form.Item
                        className='form-item'
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
                    >
                        <Input prefix={<LoginOutlined className="site-form-item-icon" />} placeholder="Логин" />
                    </Form.Item>
                    <Form.Item
                        className='form-item'
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            placeholder="Пароль"
                        />
                    </Form.Item>

                    {!!error && <Typography.Text type="danger">{error}</Typography.Text>}

                    <Form.Item className='form-item'>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="form-button"
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <div className="login">
                        <span>или </span>
                        <Link to={Routes.LOGIN}>
                            войти!
                        </Link>
                    </div>
                </Form>
            </Wrapper>
        </PageLayout>
    )
}

export default Register