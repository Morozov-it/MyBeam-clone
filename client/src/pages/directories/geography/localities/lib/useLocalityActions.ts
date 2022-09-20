/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react"
import moment from "moment"
import { FormInstance, message } from "antd"
import { MutationDefinition } from "@reduxjs/toolkit/dist/query"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { User } from "@models/user"
import { GeographyLocality, CreateLocalityValues } from "../models"
import { BaseDirectoryFields } from "@models/base"

interface Props {
    user: User
    createLocality: MutationTrigger<MutationDefinition<Omit<GeographyLocality, "id">, any, any, GeographyLocality, string>>
    deleteLocality: MutationTrigger<MutationDefinition<number, any, any, {}, string>>
    updateLocality: MutationTrigger<MutationDefinition<GeographyLocality, any, any, GeographyLocality, string>>
    editForm: FormInstance<any>
    hideCreateModal: () => void
    cancelEdit: () => void
    selectedRowKeys: React.Key[]
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
}

const useLocalityActions = ({
    user,
    createLocality,
    deleteLocality,
    updateLocality, 
    editForm, 
    hideCreateModal, 
    cancelEdit, 
    selectedRowKeys, 
    setSelectedRowKeys
}: Props) => {
    //Creating
    const onCreate = useCallback((data: Omit<GeographyLocality, 'id'>) => 
        createLocality(data), [])
    const onGroupCreate = useCallback(async (values: CreateLocalityValues) => {
        if (!!values.localities?.length) {
            const initialData: Omit<BaseDirectoryFields, 'id' | 'name'> = {
                type: "geographyLocalities",
                deleted: false,
                created_by: user,
                created_date: moment().toISOString(),
                updated_by: null,
                updated_date: null
            }
            return Promise.all(values.localities.map((locality) => onCreate({ ...initialData, ...locality }).unwrap()))
                .then(() => {
                    message.success('Данные успешно сохранены')
                    hideCreateModal()
                })
        }
    }, [user])

    //Updating
    const onUpdate = useCallback(async (record: GeographyLocality) => {
        try {
            await editForm.validateFields()
            const data: GeographyLocality = { ...record, ...editForm.getFieldsValue() }
            data.updated_by = user
            data.updated_date = moment().toISOString()
            await updateLocality(data).unwrap()
            message.success('Изменение успешно')
            cancelEdit()
        } catch {}
    }, [user])

    //Deleting
    const onDelete = useCallback((id: number) => deleteLocality(id), []) 
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

export default useLocalityActions