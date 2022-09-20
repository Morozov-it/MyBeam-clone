/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, } from 'react'
import { Alert, Form, Modal } from 'antd'
import {
    useCreateRegionMutation,
    useDeleteRegionMutation,
    useFetchRegionsQuery,
    useUpdateRegionMutation
} from './api/geographyRegions.api'
import { useFetchCountriesQuery } from '../countries/api/geographyCountries.api'
//lib & ui
import { CreateRegionValues, GeographyRegion } from './models'
import getRegionsColumns from './lib/getRegionsColumns'
import getCreatedFields from './lib/getCreatedFields'
import useRegionActions from './lib/useRegionActions'
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
import { BaseCatalogs } from '@models/base'

const Page: React.FC = () => {
    const user = useUser()
    const { width, height } = useWindowSize()

    //Queries & mutations
    const { data, isLoading, isFetching, error } = useFetchRegionsQuery('')
    const [updateRegion, { isLoading: updateLoading, error: updateError }] = useUpdateRegionMutation()
    const [createRegion, { isLoading: createLoading, error: createError }] = useCreateRegionMutation()
    const [deleteRegion, { isLoading: deleteLoading, error: deleteError }] = useDeleteRegionMutation()
    const dataError = error || updateError || createError || deleteError
    //Catalogs
    const { data: countries } = useFetchCountriesQuery('')
    const catalogs: BaseCatalogs = useMemo(() => ({ countries }), [countries])

    //Creating modal
    const [createModalVisible, showCreateModal, hideCreateModal] = useModal()
    const createFields = useCallback(getCreatedFields, [])

    //Table
    const {
        rowSelection, 
        selectedRowKeys, 
        setSelectedRowKeys,
    } = useTable<GeographyRegion>()

    const { edit, editForm, editingKey, isEditing, cancelEdit } = useEditRow<GeographyRegion>()

    const scroll = useMemo(() => ({ y: height - 260 }), [height])
    const pagination = useMemo(() => ({ onChange: cancelEdit, showSizeChanger: true }), [])
    const components = useMemo(() => ({ body: { cell: EditableCell, } }), [])

    const { onUpdate, onGroupCreate, onGroupDelete } = useRegionActions({
        user, editForm, cancelEdit, hideCreateModal, selectedRowKeys, setSelectedRowKeys,
        createRegion, deleteRegion, updateRegion
    })

    //Columns & data
    const columns = useMemo(() =>
        getEditColumns({
            columns: getRegionsColumns(catalogs),
            cancelEdit,
            edit,
            editingKey,
            isEditing,
            loading: updateLoading,
            onSave: onUpdate
        }), [editingKey, catalogs])
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
                    <SmartTable<GeographyRegion>
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
                width={800}
                title="Создать"
                centered
                footer={null}
                onCancel={hideCreateModal}
            >
                <DynamicForm<CreateRegionValues>
                    name='regions'
                    getfields={createFields}
                    loading={createLoading}
                    error={createError}
                    onFinish={onGroupCreate}
                    catalogs={catalogs}
                    width={width}
                />
            </Modal>
        </PageWrapper>
    )
}

export default Page