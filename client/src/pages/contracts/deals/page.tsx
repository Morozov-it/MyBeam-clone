/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react'
import { Alert, Drawer } from 'antd'
import { Deal } from '@models/deals'
import { UserFilter } from '@models/contracts'
import { useUser } from '@utils/hooks/useUser'
import useWindowSize from '@utils/hooks/useWindowSize'
import { useDeleteDealMutation, useFetchDealsQuery } from '@store/contracts/deals.api'
import CreateForm from './CreateForm'
import getDealsColumns from './getDealsColumns'
import SmartTable from '@components/shared/smartTable'
import PageWrapper from '@components/contracts/PageWrapper'
import Toolbar from '@components/contracts/Toolbar'
import ViewTabs from '@components/contracts/ViewTabs'
import ViewEditForm from './ViewEditForm'

const DealsPage: React.FC = () => {
    const user = useUser()
    const { width, height } = useWindowSize()

    //Editing
    const [edit, setEdit] = useState<boolean>(true)
    const onEdit = useCallback(() => setEdit(false), [])
    const offEdit = useCallback(() => setEdit(true), [])

    //Tabs
    const [activeKey, setActiveKey] = useState<string>('1')
    const toggleActiveKey = useCallback((key: string) => setActiveKey(key), [])

    //Filter
    const [filter, setFilter] = useState<UserFilter>('all')
    const onChangeFilter = useCallback((value: UserFilter) => setFilter(value), [])

    //Queries
    const { data: deals, isFetching, isLoading, error } = useFetchDealsQuery('')
    const filteredDeals = useMemo(() => {
        if (!!deals?.length) {
            return filter === 'user'
                ? deals?.filter((deal) => deal.created_by.id === user.id)
                : deals
        } else {
            return []
        }
    }, [filter, deals])
    const [deleteDeal, { isLoading: deleteDealLoading, error: deleteDealError }] = useDeleteDealMutation()

    //SelectedItem
    const [selectedItem, setSelectedItem] = useState<Deal | null>(null)
    const resetSelectedItem = useCallback(() => setSelectedItem(null), [])

    //Drawer
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const showDrawer = useCallback(() => setOpenDrawer(true), [])
    const closeDrawer = useCallback(() => setOpenDrawer(false), [])

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
                setSelectedRowKeys([])
            })
    }, [selectedRowKeys])

    return (
        <>
            <PageWrapper selectedItem={!!selectedItem} width={width}>
                <section className="main-section">
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
                        onRow={(record) => ({ onClick: () => setSelectedItem(record)})}
                    />
                    {!!error && <Alert message={JSON.stringify(error)} type="error" />}
                    {!!deleteDealError && <Alert message={JSON.stringify(deleteDealError)} type="error" />}
                </section>
                <ViewTabs
                    isAttachments={!!selectedItem?.attachments?.length}
                    edit={edit}
                    onEdit={onEdit}
                    offEdit={offEdit}
                    activeKey={activeKey}
                    onChange={toggleActiveKey}
                    onClose={resetSelectedItem}
                    items={[
                        {
                            key: '1',
                            label: 'Основные данные',
                            children: <ViewEditForm
                                edit={edit}
                                offEdit={offEdit}
                                selected={selectedItem}
                                width={width}
                                user={user}
                            />
                        },
                        {
                            key: '2',
                            label: 'История',
                            children: <div>{JSON.stringify(selectedItem?.history_log)}</div>
                        },
                    ]}
                />
            </PageWrapper>
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
        </>
    )
}

export default DealsPage