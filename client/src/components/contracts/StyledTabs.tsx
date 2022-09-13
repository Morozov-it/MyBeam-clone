import styled from 'styled-components'
import { Tabs } from 'antd'

const StyledTabs = styled(Tabs)`
    height: 100%;
    width: 100%;

    .ant-tabs, 
    .ant-tabs-content,
    .ant-tabs-content-holder,
    .ant-tabs-tabpane {
        height: 100%;
        width: 100%;
    }

    .ant-tabs-tab {
        padding: 0;
    }
    .ant-tabs-nav::before {
    bottom: -8px;
}
`

export default StyledTabs