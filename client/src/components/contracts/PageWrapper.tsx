import styled from 'styled-components'

const Wrapper = styled.div<{
    width: number
    selectedItem: boolean
}>`
    width: 100%;
    height: 100%;
    display: flex;

    .main-section {
        height: 100%;
        display: ${({ selectedItem, width }) => selectedItem && width < 850 ? 'none' : 'flex'};
        flex-direction: column;
        gap: 8px;
        width: ${({ selectedItem }) => selectedItem ? '60%' : '100%'};
        padding-right: 8px;
    }
    .view-edit-section {
        height: 100%;
        display: ${({ selectedItem }) => selectedItem ? 'flex' : 'none'};
        width: ${({ selectedItem, width }) => width < 850 ? '100%' : selectedItem ? '40%' : '0'};
        padding-left: 8px;
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