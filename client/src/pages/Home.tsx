import React from 'react'
import { Result } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Home: React.FC = () => {
    return (
        <Wrapper>
            <Result
                status="500"
                title="Страница находится в разработке"
                subTitle='Сейчас идет процесс создания раздела "Договоры" ...'
            />
        </Wrapper>
    )
}

export default Home