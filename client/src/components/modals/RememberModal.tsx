import { LoginOutlined } from '@ant-design/icons'
import { Input, Modal, Typography } from 'antd'
import { AxiosError } from 'axios'
import React, { useState } from 'react'

interface Props {
    isModalVisible: boolean
    hideModal: () => void
} 

const RememberModal: React.FC<Props> = ({ isModalVisible, hideModal }) => {
    const [value, setValue] = useState<string>('')
    const [modalLoading, setModalLoading] = useState<boolean>(false)
    const [modalError, setmodalError] = useState<string | null>(null)

    const onOk = async () => {
        setmodalError(null)
        setModalLoading(true)
        try {
            setTimeout(() => {
                setModalLoading(false)
                hideModal()
                setValue('')
            }, 1500)
        } catch (e) {
            setmodalError((e as AxiosError)?.response?.data as string)
        }
    }

    const onCancel = () => {
        hideModal()
        setValue('')
    }

    return (
        <Modal
            title="Сброс пароля"
            open={isModalVisible}
            onOk={onOk}
            confirmLoading={modalLoading}
            onCancel={onCancel}
            okButtonProps={{ disabled: !value }}
        >
            <p>Введите логин для получения ссылки для сброса пароля</p>
            <Input
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                prefix={<LoginOutlined />}
            />
            {!!modalError && <Typography.Text type="danger">{modalError}</Typography.Text>}
        </Modal>
    )
}

export default RememberModal