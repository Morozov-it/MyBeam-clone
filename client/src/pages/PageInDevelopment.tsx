import React from 'react'
import styled from 'styled-components'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@app/routes'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const PageInDevelopment: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Wrapper>
            <Result
                status="500"
                title="Страница находится в разработке"
                extra={<Button
                    onClick={() => navigate(Routes.HOME)}
                    type="primary">Главная</Button>}
            />
        </Wrapper>
    )
}

export default PageInDevelopment