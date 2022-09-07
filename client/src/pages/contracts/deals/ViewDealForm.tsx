import { Deal } from '@models/deals'
import { Button, Divider, Typography } from 'antd'
import React from 'react'

interface Props {
    selected: Deal | null
    onClose: () => void
}

const ViewDealForm: React.FC<Props> = ({ selected, onClose }) => {
    return (
        <section className="view-edit-section">
            <Divider type="vertical" />
            <Typography.Title level={5}>{selected?.name}</Typography.Title>
            <Button onClick={onClose}>close</Button>
        </section>
    )
}

export default React.memo(ViewDealForm)