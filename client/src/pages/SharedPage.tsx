import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Result } from 'antd'
import { authRoutes } from '@app/routes'
import { Route } from '@models/routes'
import { findNestedObj } from '@utils/findNestedObj'
import { getMenuItem } from '@utils/getMenuItem'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SharedPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const routes: Route[] = useMemo(() => 
        findNestedObj(authRoutes, 'path', location.pathname)?.innerLinks ?? []
    , [location.pathname]) 

    return (
        <Wrapper>
            <Result
                status='info'
                title='Этот раздел является общим.'
                subTitle='Для продолжения работы выберите интересующий вас раздел ниже ↓'
            />
            <Menu
                style={{ overflow: 'auto' }}
                triggerSubMenuAction='click'
                onClick={(info) => {
                    navigate(info.key)
                }}
                items={getMenuItem(routes)}
            />
        </Wrapper>
    )
}

export default SharedPage