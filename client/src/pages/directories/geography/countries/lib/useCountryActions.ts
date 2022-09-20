/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react"
import moment from "moment"
import { FormInstance, message } from "antd"
import { MutationDefinition } from "@reduxjs/toolkit/dist/query"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { User } from "@models/user"
import { CreateCountriesValues, GeographyCountry } from "../models"

interface Props {
    user: User
    createCountry: MutationTrigger<MutationDefinition<Omit<GeographyCountry, "id">, any, any, GeographyCountry, string>>
    deleteCountry: MutationTrigger<MutationDefinition<number, any, any, {}, string>>
    updateCountry: MutationTrigger<MutationDefinition<GeographyCountry, any, any, GeographyCountry, string>>
    editForm: FormInstance<any>
    hideCreateModal: () => void
    cancelEdit: () => void
    selectedRowKeys: React.Key[]
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
}

const useCountryActions = ({
    user,
    createCountry,
    deleteCountry,
    updateCountry, 
    editForm, 
    hideCreateModal, 
    cancelEdit, 
    selectedRowKeys, 
    setSelectedRowKeys
}: Props) => {
    //Creating
    const onCreate = useCallback((data: Omit<GeographyCountry, 'id'>) => 
        createCountry(data), [])
    const onGroupCreate = useCallback(async (values: CreateCountriesValues) => {
        if (!!values.countries?.length) {
            const initialData: Omit<GeographyCountry, 'id' | 'name' | 'code'> = {
                type: "geographyCountries",
                deleted: false,
                created_by: user,
                created_date: moment().toISOString(),
                updated_by: null,
                updated_date: null
            }
            return Promise.all(values.countries.map((country) => onCreate({ ...initialData, ...country }).unwrap()))
                .then(() => {
                    message.success('Данные успешно сохранены')
                    hideCreateModal()
                })
        }
    }, [user])

    //Updating
    const onUpdate = useCallback(async (record: GeographyCountry) => {
        try {
            await editForm.validateFields()
            const data: GeographyCountry = { ...record, ...editForm.getFieldsValue() }
            data.updated_by = user
            data.updated_date = moment().toISOString()
            await updateCountry(data).unwrap()
            message.success('Изменение успешно')
            cancelEdit()
        } catch {}
    }, [user])

    //Deleting
    const onDelete = useCallback((id: number) => deleteCountry(id), []) 
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

export default useCountryActions