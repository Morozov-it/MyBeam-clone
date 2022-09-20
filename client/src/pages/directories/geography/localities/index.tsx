/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, } from 'react'
import { Alert, Form, Modal } from 'antd'
import {
    useCreateLocalityMutation,
    useDeleteLocalityMutation,
    useFetchLocalitiesQuery,
    useUpdateLocalityMutation
} from './api/geographyLocalities.api'
import { useFetchCountriesQuery } from '../countries/api/geographyCountries.api'
import { useFetchRegionsQuery } from '../regions/api/geographyRegions.api'
//lib & ui
import { CreateLocalityValues, GeographyLocality } from './models'
import getLocalitiesColumns from './lib/getLocalitiesColumns'
import getCreatedFields from './lib/getCreatedFields'
import useLocalityActions from './lib/useLocalityActions'
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
    const { data, isLoading, isFetching, error } = useFetchLocalitiesQuery('')
    const [updateLocality, { isLoading: updateLoading, error: updateError }] = useUpdateLocalityMutation()
    const [createLocality, { isLoading: createLoading, error: createError }] = useCreateLocalityMutation()
    const [deleteLocality, { isLoading: deleteLoading, error: deleteError }] = useDeleteLocalityMutation()
    const dataError = error || updateError || createError || deleteError
    //Catalogs
    const { data: countries } = useFetchCountriesQuery('')
    const { data: regions } = useFetchRegionsQuery('')
    const catalogs: BaseCatalogs = useMemo(() => ({
        countries,
        regions: regions?.map((region) => ({ id: region.id, name: region.name + ' ' + region.prefix }))
    }), [countries, regions])

    //Creating modal
    const [createModalVisible, showCreateModal, hideCreateModal] = useModal()
    const createFields = useCallback(getCreatedFields, [])

    //Table
    const {
        rowSelection, 
        selectedRowKeys, 
        setSelectedRowKeys,
    } = useTable<GeographyLocality>()

    const { edit, editForm, editingKey, isEditing, cancelEdit } = useEditRow<GeographyLocality>()

    const scroll = useMemo(() => ({ y: height - 260 }), [height])
    const pagination = useMemo(() => ({ onChange: cancelEdit, showSizeChanger: true }), [])
    const components = useMemo(() => ({ body: { cell: EditableCell, } }), [])

    const { onUpdate, onGroupCreate, onGroupDelete } = useLocalityActions({
        user, editForm, cancelEdit, hideCreateModal, selectedRowKeys, setSelectedRowKeys,
        createLocality, deleteLocality, updateLocality
    })

    //Columns & data
    const columns = useMemo(() =>
        getEditColumns({
            columns: getLocalitiesColumns(catalogs),
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
                    <SmartTable<GeographyLocality>
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
                width={1200}
                title="Создать"
                centered
                footer={null}
                onCancel={hideCreateModal}
            >
                <DynamicForm<CreateLocalityValues>
                    name='localities'
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