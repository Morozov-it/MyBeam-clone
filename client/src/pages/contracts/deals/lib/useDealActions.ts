/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react"
import { message } from "antd"
import moment, { isMoment } from "moment"
import { v4 } from "uuid"
import { MutationDefinition } from "@reduxjs/toolkit/dist/query"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { Deal } from "@models/contracts/deals"
import { User } from "@models/user"
import { getChangedFields } from "@utils/getChangedFields"

interface Props {
    user: User
    createDeal: MutationTrigger<MutationDefinition<Omit<Deal, "id">, any, any, Deal, string>>
    deleteDeal: MutationTrigger<MutationDefinition<number, any, any, {}, string>>
    updateDeal: MutationTrigger<MutationDefinition<Deal, any, any, Deal, string>>
    createClose: () => void
    selectedRowKeys: React.Key[]
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>
    resetSelectedItem: () => void
    selectedItem: any
    changeSelectedItem: (value: any) => void
    offEdit: () => void
}

export const useDealActions = ({
    user,
    createDeal,
    updateDeal,
    deleteDeal,
    createClose,
    selectedRowKeys,
    setSelectedRowKeys,
    resetSelectedItem,
    selectedItem,
    changeSelectedItem,
    offEdit
}: Props) => {
    //Creating
    const createInitialValues: Partial<Deal> = useMemo(() => ({
        comments: null,
        customers: [],
        contract_date: null,
        end_date: null,
        name_1c: null,
        price: null,
        status: null,
        subject: null,
        auto_prolongation: false,
        include_into_count: false,
        address_into_count: false
    }), [])

    const onCreate = useCallback( async (values: any) => {
        const data = { ...values } as Omit<Deal, 'id'>
        const dateNow = moment().toISOString()
        data.contract_date = isMoment(values.contract_date)
            ? values.contract_date.toISOString() : null
        data.end_date = isMoment(values.end_date)
            ? values.end_date.toISOString() : null
        data.type = 'deal'
        data.deleted = false
        data.created_by = { ...user }
        data.created_date = dateNow
        data.updated_by = null
        data.updated_date = null
        data.attachments = []
        data.history_log = [{
            id: v4(),
            who: user,
            change_type: 'create',
            what: [],
            when: dateNow
        }]
        createDeal(data)
            .unwrap()
            .then(() => {
                message.success(`Договор успешно создан`)
                createClose()
            })
    }, [user])

    //Deleting
    const onDelete = useCallback((id: number) => deleteDeal(id), []) 
    const onGroupDelete = useCallback(() => {
        Promise.all(selectedRowKeys.map((id) => onDelete(Number(id)).unwrap()))
            .then(() => {
                message.success(`Удаление успешно`)
                setSelectedRowKeys([])
                resetSelectedItem()
            })
    }, [selectedRowKeys])

    //Updating
    const onUpdate = useCallback((values: any) => {
        const data = { ...(selectedItem ?? {}), ...values} as Deal
        const changedFields = getChangedFields(selectedItem ?? {}, data)
        if (!!changedFields.length) {
            const dateNow = moment().toISOString()
            data.updated_by = user
            data.updated_date = dateNow
            data.history_log = [
                ...selectedItem?.history_log,
                {
                    id: v4(),
                    who: user,
                    change_type: 'update',
                    when: dateNow,
                    what: changedFields,
                }
            ]
            updateDeal(data).unwrap().then((updated) => {
                message.success(`Договор успешно изменен`)
                changeSelectedItem(updated)
                offEdit()
            })
        } else {
            offEdit()
        }
    }, [selectedItem, user])

    return { onCreate, createInitialValues, onGroupDelete, onUpdate }
}