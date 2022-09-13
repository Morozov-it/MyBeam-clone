import React from 'react'
import styled from 'styled-components'
import picture from '@app/images/picture.jpg'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${picture}) 0 0/100% 100% no-repeat;
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