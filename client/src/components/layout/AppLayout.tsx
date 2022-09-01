import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import SideBar from './SideBar'
import Header from './Header'

const { Content } = Layout

const Wrapper = styled(Layout)`
    min-height: 100vh;
    overflow: hidden;

    .main-content {
        margin: 8px;
        padding: 8px;
        height: 100%;
        overflow-y: auto;
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
            <Layout>
                <Header />
                <Content className="main-content">
                    {children}
                </Content>
            </Layout>
        </Wrapper>
    )
}

export default AppLayout;