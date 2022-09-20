/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, } from 'react'
import { Alert, Form, Modal } from 'antd'
import {
    useCreateBankMutation,
    useDeleteBankMutation,
    useFetchBanksQuery,
    useUpdateBankMutation
} from './api/banks.api'
//lib & ui
import { CreateBankValues, Bank } from './models'
import getBanksColumns from './lib/getBanksColumns'
import getCreatedFields from './lib/getCreatedFields'
import useBankActions from './lib/useBankActions'
//components
import { PageWrapper } from '@components/templates/PageWrapper'
import PageToolbar from '@components/templates/PageToolbar'
import SmartTable from '@components/smartTable'
import DynamicForm from '@components/templates/DynamicForm'
import { EditableCell } from '@components/smartTable/ui'
import { getEditColumns } from '@components/smartTable/lib/getEditColumns'
//hooks
import useWindowSize from '@utils/hooks/useWindowSize'
import { useUser } from '@utils/hooks/useUser'
import { useTable } from '@utils/hooks/useTable'
import { useModal } from '@utils/hooks/useModal'
import { useEditRow } from '@utils/hooks/useEditRow'

const Page: React.FC = () => {
    const user = useUser()
    const { width, height } = useWindowSize()

    //Queries & mutations
    const { data, isLoading, isFetching, error } = useFetchBanksQuery('')
    const [updateBank, { isLoading: updateLoading, error: updateError }] = useUpdateBankMutation()
    const [createBank, { isLoading: createLoading, error: createError }] = useCreateBankMutation()
    const [deleteBank, { isLoading: deleteLoading, error: deleteError }] = useDeleteBankMutation()
    const dataError = error || updateError || createError || deleteError

    //Creating modal
    const [createModalVisible, showCreateModal, hideCreateModal] = useModal()
    const createFields = useCallback(getCreatedFields, [])

    //Table
    const {
        rowSelection, 
        selectedRowKeys, 
        setSelectedRowKeys,
    } = useTable<Bank>()

    const { edit, editForm, editingKey, isEditing, cancelEdit } = useEditRow<Bank>()

    const scroll = useMemo(() => ({ y: height - 260 }), [height])
    const pagination = useMemo(() => ({ onChange: cancelEdit, showSizeChanger: true }), [])
    const components = useMemo(() => ({ body: { cell: EditableCell, } }), [])

    const { onUpdate, onGroupCreate, onGroupDelete } = useBankActions({
        user, editForm, cancelEdit, hideCreateModal, selectedRowKeys, setSelectedRowKeys,
        createBank, deleteBank, updateBank
    })

    //Columns & data
    const columns = useMemo(() =>
        getEditColumns({
            columns: getBanksColumns(),
            cancelEdit,
            edit,
            editingKey,
            isEditing,
            loading: updateLoading,
            onSave: onUpdate
        }), [editingKey])
    const dataSource = useMemo(() => data ?? [], [data])

    return (
        <PageWrapper>
            <section className='main-section'>
                <PageToolbar
                    deleteDisable={!selectedRowKeys.length}
                    deleteLoading={deleteLoading}
                    onOpenCreate={showCreateModal}
                    onDelete={onGroupDelete}
                />
                <Form form={editForm} component={false}>
                    <SmartTable<Bank>
                        components={components}
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        loading={isFetching || isLoading}
                        scroll={scroll}
                        pagination={pagination}
                    />
                </Form>
                {(!!dataError) && <Alert message={JSON.stringify(dataError)} type="error"/>}
            </section>
            <Modal
                width={1000}
                open={createModalVisible}
                title="Создать"
                centered
                footer={null}
                onCancel={hideCreateModal}
            >
                <DynamicForm<CreateBankValues>
                    name='banks'
                    getfields={createFields}
                    loading={createLoading}
                    error={createError}
                    onFinish={onGroupCreate}
                    width={width}
                />
            </Modal>
        </PageWrapper>
    )
}

export default Page