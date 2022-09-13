/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Drawer, message, Typography } from 'antd'
import { v4 } from 'uuid'
import moment from 'moment'
import { useDeleteDealMutation, useFetchDealsQuery, useUpdateDealMutation } from '@store/contracts/deals.api'
import { Deal } from '@models/deals'
import { UserFilter } from '@models/contracts'
import { useUser } from '@utils/hooks/useUser'
import useWindowSize from '@utils/hooks/useWindowSize'
import CreateForm from './CreateForm'
import getDealsColumns from './getDealsColumns'
import SmartTable from '@components/shared/smartTable'
import Toolbar from '@components/contracts/Toolbar'
import ViewEditForm from '@components/contracts/ViewEditForm'
import HistoryTable from './HistoryTable'
import AttachmentsModal from '@components/modals/AttachmentsModal'
import StyledTabs from '@components/contracts/StyledTabs'
import TabsBar from './TabsBar'
import getUpdatedFields from './getUpdatedFields'
import { getChangedFields } from '@utils/getChangedFields'
import styled from 'styled-components'
import ResizeTemplate from '@components/contracts/ResizeTemplate'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    .main-section {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`

const DealsPage: React.FC = () => {
    const user = useUser()
    const { width, height } = useWindowSize()

    //Queries & mutations
    const { data: deals, isFetching, isLoading, error } = useFetchDealsQuery('')
    const [deleteDeal, { isLoading: deleteDealLoading, error: deleteDealError }] = useDeleteDealMutation()
    const [updateDeal, { isLoading: updateDealLoading, error: updateDealError }] = useUpdateDealMutation()

    //SelectedItem
    const [selectedItem, setSelectedItem] = useState<Deal | null>(null)
    const changeSelectedItem = useCallback((value: Deal) => setSelectedItem(value), [])
    const resetSelectedItem = useCallback(() => setSelectedItem(null), [])

    //Editing
    const [edit, setEdit] = useState<boolean>(true)
    const onEdit = useCallback(() => setEdit(false), [])
    const offEdit = useCallback(() => setEdit(true), [])

    //Tabs
    const [activeKey, setActiveKey] = useState<string>('1')
    const toggleActiveKey = useCallback((key: string) => setActiveKey(key), [])
    const onCloseTabs = useCallback(() => {
        offEdit()
        resetSelectedItem()
    }, [])

    //Filter
    const [filter, setFilter] = useState<UserFilter>('all')
    const onChangeFilter = useCallback((value: UserFilter) => setFilter(value), [])
    const filteredDeals = useMemo(() => {
        if (!!deals?.length) {
            return filter === 'user'
                ? deals?.filter((deal) => deal.created_by.id === user.id)
                : deals
        } else {
            return []
        }
    }, [filter, deals])

    //Drawer
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const showDrawer = useCallback(() => setOpenDrawer(true), [])
    const closeDrawer = useCallback(() => setOpenDrawer(false), [])

    //Attachments modal
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const showModal = useCallback(() => setIsModalVisible(true), [])
    const hideModal = useCallback(() => setIsModalVisible(false), [])

    // Table
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }, [])
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    //Deleting
    const onDeleteDeal = useCallback((id: number) => deleteDeal(id), []) 
    const onGroupDelete = useCallback(() => {
        Promise.all(selectedRowKeys.map((id) => onDeleteDeal(Number(id)).unwrap()))
            .then(() => {
                message.success(`Удаление успешно`)
                setSelectedRowKeys([])
                resetSelectedItem()
            })
    }, [selectedRowKeys])

    //Updating
    const onUpdate = (values: any) => {
        const data = { ...(selectedItem ?? {}), ...values} as Deal
        const changedFields = getChangedFields(selectedItem ?? {}, data)
        if (!!changedFields.length) {
            const dateNow = moment().toISOString()
            data.updated_by = user
            data.updated_date = dateNow
            data.history_log = [
                ...(selectedItem?.history_log ?? []),
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
    }

    return (
        <Wrapper>
            <ResizeTemplate
                selectedItem={selectedItem}
                width={width}
                mainSection={
                    <div className="main-section">
                        <Toolbar
                            deleteDisable={!selectedRowKeys.length}
                            deleteLoading={deleteDealLoading}
                            filter={filter}
                            onChangeFilter={onChangeFilter}
                            onOpenCreate={showDrawer}
                            onDelete={onGroupDelete}
                        />
                        <SmartTable<Deal>
                            columns={getDealsColumns()}
                            dataSource={filteredDeals}
                            rowSelection={rowSelection}
                            loading={isFetching || isLoading}
                            scroll={{ x: 'max-content', y: height - 260 }}
                            onRow={(record) => ({ onClick: () => changeSelectedItem(record) })}
                            pagination={{
                                showTotal: (total) =>
                                    <Typography.Title 
                                        style={{ margin: 0, lineHeight: '32px' }} 
                                        level={5}>Всего элементов: {total}
                                    </Typography.Title>,
                                showSizeChanger: true
                            }}
                        />
                        {!!error && <Alert message={JSON.stringify(error)} type="error" />}
                        {!!deleteDealError && <Alert message={JSON.stringify(deleteDealError)} type="error" />}
                    </div>
                }
                viewSection={
                    <StyledTabs
                        activeKey={activeKey}
                        onChange={toggleActiveKey}
                        tabBarExtraContent={{
                            right: <TabsBar
                                activeKey={activeKey}
                                edit={edit}
                                onEdit={onEdit}
                                isAttachments={!!selectedItem?.attachments?.length}
                                openAttachments={showModal}
                                onClose={onCloseTabs}
                            />
                        }}
                        items={[
                            {
                                key: '1',
                                label: 'Основные данные',
                                children: <ViewEditForm
                                    onFinish={onUpdate}
                                    getFields={getUpdatedFields}
                                    error={updateDealError}
                                    loading={updateDealLoading}
                                    edit={edit}
                                    offEdit={offEdit}
                                    selected={selectedItem}
                                />
                            },
                            {
                                key: '2',
                                label: 'История',
                                children: <HistoryTable data={selectedItem?.history_log ?? []} />
                            },
                        ]}
                    />
                }
            />
            <Drawer
                title="Создать договор"
                placement="right"
                onClose={closeDrawer}
                open={openDrawer}
                width={width > 1500
                    ? width / 3
                    : width > 800 ? width / 2 : width
                }
            >
                <CreateForm
                    user={user}
                    closeDrawer={closeDrawer}
                />
            </Drawer>
            <AttachmentsModal
                attachments={selectedItem?.attachments}
                isModalVisible={isModalVisible}
                hideModal={hideModal}
            />
        </Wrapper>
    )
}

export default DealsPage