import React from 'react'
import styled from 'styled-components'
import img from '@app/images/process-develop.gif'

const Wrapper = styled.div`
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    img {
        width: 395px;
        height: 285px;
    }
`

const PageInDevelopment = () => {
    return (
        <Wrapper>
            <img src={img} alt="in development" />
            <h1>Страница находится в разработке</h1>
        </Wrapper>
    )
}

export default PageInDevelopment