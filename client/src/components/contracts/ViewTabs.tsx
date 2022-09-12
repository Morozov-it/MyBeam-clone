import React, { useCallback } from 'react'
import styled from 'styled-components'
import { CloseOutlined, EditOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Badge, Button, Space, Tabs, TabsProps } from 'antd'

const Wrapper = styled(Tabs)`
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
    isAttachments: boolean
    edit: boolean
    onEdit: () => void
    offEdit: () => void
    onChange: (key: string) => void
    onClose: () => void
    items?: TabsProps['items']
}

const ViewTabs: React.FC<Props> = ({
    activeKey,
    edit,
    onEdit,
    offEdit,
    isAttachments,
    onChange,
    onClose,
    items
}) => {
    const handleClose = useCallback(() => {
        offEdit()
        onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Wrapper
            activeKey={activeKey}
            onChange={onChange}
            tabBarExtraContent={{
                right: activeKey === '1'
                    ? <Space wrap>
                        <Button
                            disabled={!edit}
                            onClick={onEdit}
                        >
                            <EditOutlined />
                        </Button>
                        <Badge
                            dot
                            style={{ display: isAttachments ? 'block' : 'none' }}
                        >
                            <Button>
                                <PaperClipOutlined />
                            </Button>
                        </Badge>
                        <Button onClick={handleClose}>
                            <CloseOutlined />
                        </Button>
                    </Space>
                    : <Button onClick={handleClose}><CloseOutlined /></Button>
            }}
            items={items}
        />
    )
}

export default React.memo(ViewTabs)