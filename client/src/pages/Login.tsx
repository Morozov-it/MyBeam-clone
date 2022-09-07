import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, LoginOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Form, Input } from 'antd'
import { AxiosError } from 'axios'
import logo from '@app/images/logo.png'
import { Routes } from '@app/routes'
import PageLayout from '@components/layout/PageLayout'
import { useActions } from '@store/store'
import { login } from '@api/user'
import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '@app/constants'
import RememberModal from '@components/modals/RememberModal'

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
    .remember {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .not-remember {
        color: #1890ff;
        cursor: pointer;
    }
    .register {
        text-align: center;
    }
`

interface FormValues {
    email: string
    password: string
    remember: boolean
}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { setUser } = useActions()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const showModal = useCallback(() => setIsModalVisible(true), [])
    const hideModal = useCallback(() => setIsModalVisible(false), [])

    const onFinish = async ({ email, password, remember }: FormValues) => {
        setError(null)
        setLoading(true)
        try {
            const response = await login({ email, password })
            setUser(response.data.user)
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken)
            remember && localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.data.user))
            navigate(Routes.HOME)
        } catch (e) {
            const err = e as AxiosError
            err.response?.data
                ? setError(JSON.stringify(err.response.data))
                : setError(err.message)
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

                    {!!error && <Alert message={error} type="error" />}

                    <div className='form-item remember'>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Запомнить</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <span className="not-remember" onClick={showModal}>
                                Забыли пароль?
                            </span>
                            
                        </Form.Item>
                    </div>
                    <Form.Item className='form-item'>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="form-button"
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <div className="register">
                        <span>или </span>
                        <Link to={Routes.REGISTER}>
                            зарегистрироваться!
                        </Link>
                    </div>
                </Form>
                <RememberModal
                    isModalVisible={isModalVisible}
                    hideModal={hideModal}
                />
            </Wrapper>
        </PageLayout>
    )
}

export default Login