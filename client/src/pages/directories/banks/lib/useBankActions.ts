/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react"
import moment from "moment"
import { FormInstance, message } from "antd"
import { MutationDefinition } from "@reduxjs/toolkit/dist/query"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { User } from "@models/user"
import { Bank, CreateBankValues } from "../models"
import { BaseDirectoryFields } from "@models/base"

interface Props {
    user: User
    createBank: MutationTrigger<MutationDefinition<Omit<Bank, "id">, any, any, Bank, string>>
    deleteBank: MutationTrigger<MutationDefinition<number, any, any, {}, string>>
    updateBank: MutationTrigger<MutationDefinition<Bank, any, any, Bank, string>>
    editForm: FormInstance<any>
    hideCreateModal: () => void
    cancelEdit: () => void
    selectedRowKeys: React.Key[]
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
}

const useBankActions = ({
    user,
    createBank,
    deleteBank,
    updateBank, 
    editForm, 
    hideCreateModal, 
    cancelEdit, 
    selectedRowKeys, 
    setSelectedRowKeys
}: Props) => {
    //Creating
    const onCreate = useCallback((data: Omit<Bank, 'id'>) => 
        createBank(data), [])
    const onGroupCreate = useCallback(async (values: CreateBankValues) => {
        if (!!values.banks?.length) {
            const initialData: Omit<BaseDirectoryFields, 'id' | 'name'> = {
                type: "geographyCountries",
                deleted: false,
                created_by: user,
                created_date: moment().toISOString(),
                updated_by: null,
                updated_date: null
            }
            return Promise.all(values.banks.map((bank) => onCreate({ ...initialData, ...bank }).unwrap()))
                .then(() => {
                    message.success('Данные успешно сохранены')
                    hideCreateModal()
                })
        }
    }, [user])

    //Updating
    const onUpdate = useCallback(async (record: Bank) => {
        try {
            await editForm.validateFields()
            const data: Bank = { ...record, ...editForm.getFieldsValue() }
            data.updated_by = user
            data.updated_date = moment().toISOString()
            await updateBank(data).unwrap()
            message.success('Изменение успешно')
            cancelEdit()
        } catch {}
    }, [user])

    //Deleting
    const onDelete = useCallback((id: number) => deleteBank(id), []) 
    const onGroupDelete = useCallback(async () => {
        Promise.all(selectedRowKeys.map((id) => onDelete(Number(id)).unwrap()))
            .then(() => {
                message.success(`Удаление успешно`)
                setSelectedRowKeys([])
            })
    }, [selectedRowKeys])

    return {
        onGroupCreate,
        onUpdate,
        onGroupDelete
    }
}

export default useBankActions