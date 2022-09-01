import React, { useRef, useState } from 'react'
import { Layout, Menu } from 'antd'
import { ChromeOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { authRoutes, Routes } from '@app/routes'
import { getMenuItem } from '@utils/getMenuItem'

const Wrapper = styled(Layout.Sider)`
    .logo {
        padding: 10px;
        display: flex;
        justify-content: center;
        & > a > span {
            color: white;
            width: 100%;
            font-size: 30px;
        }
    }
`

const SideBar: React.FC = () => {
    const sideLinks = useRef(authRoutes.slice(2))
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const navigate = useNavigate()

    return (
        <Wrapper
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className='logo'>
                <Link to={Routes.HOME} onClick={() => setSelectedKeys([])}><ChromeOutlined /></Link>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                onClick={(info) => {
                    setSelectedKeys([info.key])
                    navigate(info.key)
                }}
                items={getMenuItem(sideLinks.current)} />
        </Wrapper>
    )
}

export default SideBar