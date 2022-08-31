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
    .ant-layout-sider-zero-width-trigger {
        top: 0;
        color: #001529;
        background: #fff;
    }
`

const SideBar: React.FC = () => {
    const sideLinks = useRef(authRoutes.slice(1))
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [collapsedWidth, setCollapsedWidth] = useState<number>(80)
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const navigate = useNavigate()

    return (
        <Wrapper
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => {
                console.log(value)
                setCollapsed(value)
            }}
            breakpoint="xs"
            collapsedWidth={collapsedWidth}
            onBreakpoint={broken => {
                broken ? setCollapsedWidth(0) : setCollapsedWidth(80)
            }}
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