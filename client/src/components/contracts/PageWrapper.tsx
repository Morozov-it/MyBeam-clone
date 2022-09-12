import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    .main-section {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
    }
`

export default Wrapper