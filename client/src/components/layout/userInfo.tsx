import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useActions, useAppSelector } from '@store/store'
import { Routes } from '@app/routes'

const UserInfo: React.FC = () => {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.user)
    const { logout } = useActions()

    const logOut = () => {
        logout()
        navigate(Routes.LOGIN)
    }

    const menu = <Menu items={[
        {
            key: '1',
            label: <div
                style={{ cursor: 'text', textAlign: 'center' }}
                onClick={(e) => e.stopPropagation()}>{user?.email}</div>,
        },
        {
            key: '2',
            label: (
                <div onClick={() => navigate(Routes.USER_SETTINGS)}>
                    Параметры
                </div>
            ),
            icon: <SettingOutlined />
        },
        {
            key: '3',
            label: (
                <div onClick={logOut}>
                    Выйти из системы
                </div>
            ),
            icon: <LogoutOutlined />,
            danger: true
        },
    ]}
    />

    return (
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button>
                <UserOutlined />
                <span>{user?.name}</span>
            </Button>
        </Dropdown>
    )
}

export default React.memo(UserInfo)
