/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, } from 'react'
import { Alert, Form, Modal } from 'antd'
import {
    useCreateCountryMutation,
    useDeleteCountryMutation,
    useFetchCountriesQuery,
    useUpdateCountryMutation
} from './api/geographyCountries.api'
//lib & ui
import { CreateCountryValues, GeographyCountry } from './models'
import getCountriesColumns from './lib/getCountriesColumns'
import getCreatedFields from './lib/getCreatedFields'
import useCountryActions from './lib/useCountryActions'
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
    const { data, isLoading, isFetching, error } = useFetchCountriesQuery('')
    const [updateCountry, { isLoading: updateLoading, error: updateError }] = useUpdateCountryMutation()
    const [createCountry, { isLoading: createLoading, error: createError }] = useCreateCountryMutation()
    const [deleteCountry, { isLoading: deleteLoading, error: deleteError }] = useDeleteCountryMutation()
    const dataError = error || updateError || createError || deleteError

    //Creating modal
    const [createModalVisible, showCreateModal, hideCreateModal] = useModal()
    const createFields = useCallback(getCreatedFields, [])

    //Table
    const {
        rowSelection, 
        selectedRowKeys, 
        setSelectedRowKeys,
    } = useTable<GeographyCountry>()

    const { edit, editForm, editingKey, isEditing, cancelEdit } = useEditRow<GeographyCountry>()

    const scroll = useMemo(() => ({ y: height - 260 }), [height])
    const pagination = useMemo(() => ({ onChange: cancelEdit, showSizeChanger: true }), [])
    const components = useMemo(() => ({ body: { cell: EditableCell, } }), [])

    const { onUpdate, onGroupCreate, onGroupDelete } = useCountryActions({
        user, editForm, cancelEdit, hideCreateModal, selectedRowKeys, setSelectedRowKeys,
        createCountry, deleteCountry, updateCountry
    })

    //Columns & data
    const columns = useMemo(() =>
        getEditColumns({
            columns: getCountriesColumns(),
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
                    <SmartTable<GeographyCountry>
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
                open={createModalVisible}
                title="Создать"
                centered
                footer={null}
                onCancel={hideCreateModal}
            >
                <DynamicForm<CreateCountryValues>
                    name='countries'
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