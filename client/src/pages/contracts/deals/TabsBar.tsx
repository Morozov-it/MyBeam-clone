import React from 'react'
import { CloseOutlined, EditOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Badge, Button, Space, Tooltip } from 'antd'

interface Props {
    activeKey: string
    isAttachments: boolean
    openAttachments: () => void
    edit: boolean
    onEdit: () => void
    onClose: () => void
}

const TabsBar: React.FC<Props> = ({ activeKey, edit, onEdit, onClose, isAttachments, openAttachments }) => {
    if (activeKey === '1') {
        return (
            <Space wrap>
                <Tooltip title='Изменить'>
                    <Button
                        disabled={!edit}
                        onClick={onEdit}
                    >
                        <EditOutlined />
                    </Button>
                </Tooltip>
                <Tooltip title='Вложения'>
                    <Badge
                        dot
                        style={{ display: isAttachments ? 'block' : 'none' }}
                    >
                        <Button onClick={openAttachments}>
                            <PaperClipOutlined />
                        </Button>
                    </Badge>
                </Tooltip>
            <Tooltip title='Закрыть'>
                <Button onClick={onClose}>
                    <CloseOutlined />
                </Button>
                </Tooltip>
            </Space>
        )
    } else {
        return <Button onClick={onClose}><CloseOutlined /></Button>
    }
}

export default React.memo(TabsBar)