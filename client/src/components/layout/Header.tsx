import React, { useCallback, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Breadcrumb, Button, Layout, Tooltip } from 'antd'
import { CaretRightOutlined, WindowsOutlined } from '@ant-design/icons'
import { getBreadcrumbs } from '@utils/getBreadcrumbs'
import SearchDrop from '@components/controllers/SearchDrop'
import { mergedRoutes } from '@utils/mergeRoutes'
import UserInfo from './UserInfo'
import useWindowSize from '@utils/hooks/useWindowSize'

const Wrapper = styled(Layout.Header)`
    height: fit-content;
    line-height: unset;
    margin: 8px 8px 0 8px;
    padding: 8px;
    gap: 8px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .header-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .ant-breadcrumb {
        font-size: 16px;
        align-items: center;
    }
`

const Header: React.FC = () => {
    const { width } = useWindowSize()
    const location = useLocation()
    const navigate = useNavigate()

    const catalog = useMemo(() => mergedRoutes.map((route) => ({ value: route.title, key: route.path })), [])
    const onSelect = useCallback((path: string) => {
        navigate(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Wrapper>
            <Breadcrumb separator={<CaretRightOutlined />}>
                {
                    getBreadcrumbs(location.pathname, mergedRoutes).map((route) => route && (
                        <Breadcrumb.Item key={route.path}>
                            <Link to={route.path}>
                                {route.icon} {route.title}
                            </Link>
                        </Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
            <div className="header-content">
                {width > 700 && <SearchDrop catalog={catalog} onSelect={onSelect} />}
                <Tooltip title={'Новое окно'}>
                    <Link to={location.pathname} target="_blank">
                        <Button>
                            <WindowsOutlined />
                        </Button>
                    </Link>
                </Tooltip>
                <UserInfo />
            </div>
        </Wrapper>
    )
}

export default Header