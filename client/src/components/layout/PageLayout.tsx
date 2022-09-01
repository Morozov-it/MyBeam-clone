import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, blue, white);
    display: flex;
    align-items: center;
    justify-content: center;
`

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Wrapper>{children}</Wrapper>
    )
}

export default PageLayout