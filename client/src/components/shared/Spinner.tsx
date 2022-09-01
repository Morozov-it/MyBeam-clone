import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Spinner: React.FC = () => {
    return (
        <Wrapper>
            <Spin size="large" />
        </Wrapper>
    )
}

export default Spinner