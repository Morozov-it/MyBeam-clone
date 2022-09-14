import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Tabs, TabsProps } from 'antd'

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

interface Props {
    activeKey: string
    toggleActiveKey: (activeKey: string) => void
    tabsBar: React.ReactNode
    tabsItems: TabsProps['items']
}

const ViewTabs: React.FC<Props> = ({ activeKey, toggleActiveKey, tabsBar, tabsItems }) => {
    const tabBarExtraContent = useMemo(() => ({
        right: tabsBar
    }), [tabsBar])

    return (
        <StyledTabs
            activeKey={activeKey}
            onChange={toggleActiveKey}
            tabBarExtraContent={tabBarExtraContent}
            items={tabsItems}
        />
    )
}

export default React.memo(ViewTabs)