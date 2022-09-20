/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react"
import moment from "moment"
import { FormInstance, message } from "antd"
import { MutationDefinition } from "@reduxjs/toolkit/dist/query"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { User } from "@models/user"
import { GeographyRegion, CreateRegionValues } from "../models"
import { BaseDirectoryFields } from "@models/base"

interface Props {
    user: User
    createRegion: MutationTrigger<MutationDefinition<Omit<GeographyRegion, "id">, any, any, GeographyRegion, string>>
    deleteRegion: MutationTrigger<MutationDefinition<number, any, any, {}, string>>
    updateRegion: MutationTrigger<MutationDefinition<GeographyRegion, any, any, GeographyRegion, string>>
    editForm: FormInstance<any>
    hideCreateModal: () => void
    cancelEdit: () => void
    selectedRowKeys: React.Key[]
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
}

const useRegionActions = ({
    user,
    createRegion,
    deleteRegion,
    updateRegion, 
    editForm, 
    hideCreateModal, 
    cancelEdit, 
    selectedRowKeys, 
    setSelectedRowKeys
}: Props) => {
    //Creating
    const onCreate = useCallback((data: Omit<GeographyRegion, 'id'>) => 
        createRegion(data), [])
    const onGroupCreate = useCallback(async (values: CreateRegionValues) => {
        if (!!values.regions?.length) {
            const initialData: Omit<BaseDirectoryFields, 'id' | 'name'> = {
                type: "geographyRegions",
                deleted: false,
                created_by: user,
                created_date: moment().toISOString(),
                updated_by: null,
                updated_date: null
            }
            return Promise.all(values.regions.map((region) => onCreate({ ...initialData, ...region }).unwrap()))
                .then(() => {
                    message.success('Данные успешно сохранены')
                    hideCreateModal()
                })
        }
    }, [user])

    //Updating
    const onUpdate = useCallback(async (record: GeographyRegion) => {
        try {
            await editForm.validateFields()
            const data: GeographyRegion = { ...record, ...editForm.getFieldsValue() }
            data.updated_by = user
            data.updated_date = moment().toISOString()
            await updateRegion(data).unwrap()
            message.success('Изменение успешно')
            cancelEdit()
        } catch {}
    }, [user])

    //Deleting
    const onDelete = useCallback((id: number) => deleteRegion(id), []) 
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

export default useRegionActions