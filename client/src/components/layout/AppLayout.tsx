import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import SideBar from './SideBar'

const { Header, Content } = Layout

const Wrapper = styled(Layout)`
    min-height: 100vh;
    overflow: hidden;

    .main-content {
        margin: 8px;
        padding: 8px;
        height: 100%;
        overflow-y: auto;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }

    .ant-layout-footer {
        text-align: center;
        padding: 10px;
    }
`

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Wrapper>
            <SideBar />
            <Layout className="site-layout">
                <Header className="site-layout-background" />
                <Content className="main-content site-layout-background">
                    {children}
                </Content>
            </Layout>
        </Wrapper>
    )
}

export default AppLayout;