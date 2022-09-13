import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Modal, message, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'

interface Props {
    isModalVisible: boolean
    hideModal: () => void
    attachments?: UploadFile[] | null
}

const AttachmentsModal: React.FC<Props> = ({ attachments, isModalVisible, hideModal }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const resetFileList = useCallback(() => setFileList([...(attachments ?? [])]), [attachments])

    const [modalLoading, setModalLoading] = useState<boolean>(false)
    const [modalError, setmodalError] = useState<string | null>(null)

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'removed') {
            setFileList((prev) => prev.filter((file) => file.uid !== info.file.uid))
        } else {
            setFileList((prev) => [...prev, info.file])
        }
    }

    const onOk = async () => {
        setmodalError(null)
        setModalLoading(true)
        try {
            message.success('Файлы успешно загружены')
            setTimeout(() => {
                setModalLoading(false)
                hideModal()
            }, 1500)
        } catch (e) {
            setmodalError(e as string)
        }
    }

    const onCancel = () => {
        resetFileList()
        hideModal()
    }

    useEffect(() => {
        resetFileList()
    }, [resetFileList])

    console.log(fileList)

    return (
        <Modal
            title="Список документов"
            open={isModalVisible}
            okText='Сохранить'
            cancelText='Отменить'
            onOk={onOk}
            confirmLoading={modalLoading}
            onCancel={onCancel}
        >
            <Upload.Dragger
                name='file'
                multiple
                beforeUpload={() => false}
                onChange={handleChange}
                fileList={fileList}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Кликните или перетащите файл, чтобы загрузить</p>
                <p className="ant-upload-hint">Поддерживается загрузка одного файла или группы выбранных файлов</p>
            </Upload.Dragger>
            {!!modalError && <Alert type='error' message={modalError} />}
        </Modal>
    )
}

export default React.memo(AttachmentsModal)