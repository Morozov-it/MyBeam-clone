import React from 'react'
import styled from 'styled-components'
import { CloseOutlined, EditOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Badge, Button, Divider, Space, Tabs, TabsProps } from 'antd'

const Body = styled.div`
    width: 100%;
    height: 100%;

    .ant-tabs, 
    .ant-tabs-content,
    .ant-tabs-content-holder,
    .ant-tabs-tabpane {
        height: 100%;
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
    return (
        <section className="view-edit-section">
            <Divider type="vertical" />
            <Body>
                <Tabs
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
                                <Button
                                    onClick={() => {
                                        offEdit()
                                        onClose()
                                    }}
                                >
                                    <CloseOutlined />
                                </Button>
                            </Space>
                            : <Button onClick={() => {
                                    offEdit()
                                    onClose()
                                }
                            }><CloseOutlined /></Button>
                    }}
                    items={items}
                />
            </Body>
        </section>
    )
}

export default React.memo(ViewTabs)