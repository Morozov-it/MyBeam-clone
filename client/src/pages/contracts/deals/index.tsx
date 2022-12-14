/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react'
import { Alert, Drawer, Typography } from 'antd'
//store
import { useCreateDealMutation, useDeleteDealMutation, useFetchDealsQuery, useUpdateDealMutation } from './api/deals.api'
import { useFetchCustomersQuery } from '../customers/api/customers.api'
//models
import { Deal, StatusDealType, SubjectDealType } from './models'
import { BaseCatalogs, Catalog } from '@models/base'
//lib & ui
import TabsBar from './ui/TabsBar'
import HistoryTable from './ui/HistoryView'
import getDealsColumns from './lib/getDealsColumns'
import getUpdatedFields from './lib/getUpdatedFields'
import getCreatedFields from './lib/getCreatedFields'
import { useDealActions } from './lib/useDealActions'
//components
import SmartTable from '@components/smartTable'
import AttachmentsModal from '@components/modals/AttachmentsModal'
import PageToolbar from '@components/templates/PageToolbar'
import CreateForm from '@components/templates/CreateForm'
import ViewEditForm from '@components/templates/ViewEditForm'
import ViewTabs from '@components/templates/ViewTabs'
import ResizeTemplate from '@components/templates/ResizeTemplate'
import { PageWrapper } from '@components/templates/PageWrapper'
//hooks
import useWindowSize from '@utils/hooks/useWindowSize'
import { useModal } from '@utils/hooks/useModal'
import { useDrawer } from '@utils/hooks/useDrawer'
import { useTabs } from '@utils/hooks/useTabs'
import { useTable } from '@utils/hooks/useTable'
import { useUserFilter } from '@utils/hooks/useUserFilter'
import { useUser } from '@utils/hooks/useUser'

const Page: React.FC = () => {
    const user = useUser()
    const { width, height } = useWindowSize()

    //Queries & mutations
    const { data: deals, isFetching, isLoading, error } = useFetchDealsQuery('')
    const [deleteDeal, { isLoading: deleteDealLoading, error: deleteDealError }] = useDeleteDealMutation()
    const [updateDeal, { isLoading: updateDealLoading, error: updateDealError }] = useUpdateDealMutation()
    const [createDeal, { isLoading: createDealLoading, error: createDealError }] = useCreateDealMutation()
    //Catalogs
    //TODO: change to real server catalogs
    const { data: customers } = useFetchCustomersQuery('')
    const catalogs: BaseCatalogs = useMemo(() => {
        const subjects: Catalog[] = Object.entries(SubjectDealType).map(([value, name]) => ({ id: value, name }))
        const statuses: Catalog[] = Object.entries(StatusDealType).map(([value, name]) => ({ id: value, name }))
        return {
            customers,
            subjects,
            statuses
        }
    }, [customers])

    //Table
    const {
        selectedItem,
        changeSelectedItem,
        resetSelectedItem, 
        onRowClick, 
        rowSelection, 
        selectedRowKeys, 
        setSelectedRowKeys, 
    } = useTable<Deal>()
    const columns = useMemo(() => getDealsColumns() ,[])
    const scroll = useMemo(() => ({ x: 'max-content', y: height - 260 }), [height])
    const pagination = useMemo(() => (
        {
            showTotal: (total: number) =>
                <Typography.Title 
                    style={{ margin: 0, lineHeight: '32px' }} 
                    level={5}>?????????? ??????????????????: {total}
                </Typography.Title>,
            showSizeChanger: true
        }
    ), [])
    //Filter
    const { filteredEntities, userFilter, toggleFilter } = useUserFilter<Deal>(user.id, deals)
    //ViewTabs
    const { activeKey, toggleActiveKey, edit, offEdit, onEdit, onCloseTabs } = useTabs(resetSelectedItem)
    //Drawer
    const [createDrawer, createShow, createClose] = useDrawer()
    //Attachments modal
    const [attachmentsModal, attachmentsShow, attachmentsHide] = useModal()
    //Fields
    const updatedFields = useCallback(getUpdatedFields<Deal>, [])
    const createdFields = useCallback(getCreatedFields<Deal>, [])
    //Actions
    const { createInitialValues, onCreate, onUpdate, onGroupDelete } = useDealActions({
        user,
        createDeal,
        deleteDeal,
        updateDeal,
        createClose,
        selectedRowKeys,
        setSelectedRowKeys,
        resetSelectedItem,
        selectedItem,
        changeSelectedItem,
        offEdit
    })

    //TabsItems
    const tabsItems = useMemo(() => [
        {
            key: '1',
            label: '???????????????? ????????????',
            children: <ViewEditForm<Deal>
                onFinish={onUpdate}
                getFields={updatedFields}
                error={updateDealError}
                loading={updateDealLoading}
                edit={edit}
                offEdit={offEdit}
                selected={selectedItem}
                catalogs={catalogs}
            />
        },
        {
            key: '2',
            label: '??????????????',
            children: <HistoryTable
                data={selectedItem?.history_log}
                title={selectedItem?.name}
            />
        },
    ], [onUpdate, updateDealError, updateDealLoading, edit, selectedItem])

    return (
        <PageWrapper>
            <ResizeTemplate<Deal>
                selectedItem={selectedItem}
                width={width}
                mainSection={
                    <section className="main-section">
                        <PageToolbar
                            deleteDisable={!selectedRowKeys.length}
                            deleteLoading={deleteDealLoading}
                            userFilter={userFilter}
                            onChangeFilter={toggleFilter}
                            onOpenCreate={createShow}
                            onDelete={onGroupDelete}
                            userSelect
                        />
                        <SmartTable<Deal>
                            columns={columns}
                            dataSource={filteredEntities}
                            rowSelection={rowSelection}
                            loading={isFetching || isLoading}
                            scroll={scroll}
                            onRow={onRowClick}
                            pagination={pagination}
                        />
                        {(!!error || !!deleteDealError) && <Alert message={JSON.stringify(error || deleteDealError)} type="error" />}
                    </section>
                }
                viewSection={
                    <ViewTabs
                        activeKey={activeKey}
                        toggleActiveKey={toggleActiveKey}
                        tabsBar={
                            <TabsBar
                                activeKey={activeKey}
                                edit={edit}
                                onEdit={onEdit}
                                isAttachments={!!selectedItem?.attachments?.length}
                                openAttachments={attachmentsShow}
                                onClose={onCloseTabs}
                            />
                        }
                        tabsItems={tabsItems}
                    />
                }
            />
            <Drawer
                title="?????????????? ??????????????"
                placement="right"
                onClose={createClose}
                open={createDrawer}
                width={width > 700 ? 530 : width}
            >
                <CreateForm<Deal>
                    getFields={createdFields}
                    onFinish={onCreate}
                    error={createDealError}
                    loading={createDealLoading}
                    initialValues={createInitialValues}
                    catalogs={catalogs}
                />
            </Drawer>
            <AttachmentsModal
                attachments={selectedItem?.attachments}
                isModalVisible={attachmentsModal}
                hideModal={attachmentsHide}
            />
        </PageWrapper>
    )
}

export default Page