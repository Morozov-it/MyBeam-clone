import React from 'react'
import { Form, Input, InputNumber } from 'antd'
import { CatalogSelect } from '@components/controllers'
import { Catalog } from '@models/base'
import { EditType } from '../lib/types'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: EditType
    record: any
    index: number
    children: React.ReactNode
    catalog?: Catalog[]
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    catalog,
    ...restProps
}) => {
    const inputNode = () => {
        switch (inputType) {
            case 'number':
                return <InputNumber />
            case 'select':
                return <CatalogSelect catalog={catalog} />
            case 'text':
                return <Input />
            default:
                return <Input />
        }
    }

    return (
        <td {...restProps}>
            {editing ? (
            <Form.Item
                name={dataIndex}
                style={{ margin: 0 }}
                rules={[
                {
                    required: true,
                    message: 'Введите данные',
                },
                ]}
            >
                {inputNode()}
            </Form.Item>
            ) : (
            children
            )}
        </td>
    )
}

export default React.memo(EditableCell)