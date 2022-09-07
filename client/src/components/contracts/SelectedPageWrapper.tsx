import styled from 'styled-components'

const Wrapper = styled.div<{
    width: number
    selectedItem: boolean
}>`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 8px;

    .main-section {
        height: 100%;
        display: ${({ selectedItem, width }) => selectedItem && width < 755 ? 'none' : 'flex'};
        flex-direction: column;
        gap: 8px;
        width: ${({ selectedItem }) => selectedItem ? '60%' : '100%'};
    }
    .view-edit-section {
        height: 100%;
        display: ${({ selectedItem }) => selectedItem ? 'flex' : 'none'};
        width: ${({ selectedItem, width }) => width < 755 ? '100%' : selectedItem ? '40%' : '0'};
    }

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
    }

    .ant-divider-vertical {
        height: 100%;
        margin: 0 8px 0 0;
        border-left: 2px solid rgba(0, 0, 0, 0.06);
    }
`

export default Wrapper