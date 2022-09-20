/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react"
import { Form } from "antd"

export const useEditRow = <T extends { id: React.Key },>() => {
    //Editing
    const [editForm] = Form.useForm()
    const [editingKey, setEditingKey] = useState<React.Key>('')
    const isEditing = useCallback((key: React.Key) => key === editingKey, [editingKey])
    const edit = useCallback((record: T) => {
        editForm.setFieldsValue({ ...record })
        setEditingKey(record.id)
    }, [])
    const cancelEdit = useCallback(() => {
        setEditingKey('')
        editForm.resetFields()
    }, [])

    return {
        editForm,
        editingKey,
        isEditing,
        edit,
        cancelEdit
    }
}