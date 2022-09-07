/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Drawer } from 'antd'
import SelectedPageWrapper from '@components/contracts/SelectedPageWrapper'
import SmartTable from '@components/shared/smartTable'
import { Deal } from '@models/deals'
import { getDealsColumns } from './getDealsColumns'
import useWindowSize from '@utils/hooks/useWindowSize'
import { useAppSelector } from '@store/store'
import { useDeleteDealMutation, useLazyFetchDealsQuery } from '@store/contracts/deals.api'
import { UserFilter } from '@models/contracts'
import { useFetchCustomersQuery } from '@store/contracts/customers.api'
import ContractsToolbar from '@components/contracts/ContractsToolbar'
import CreateDealForm from './CreateDealForm'
import ViewDealForm from './ViewDealForm'

const DealsPage: React.FC = () => {
    const user = useAppSelector((state) => state.user)
    const { width } = useWindowSize()

    //Queries
    const { data: customers } = useFetchCustomersQuery({})
    const [fetchDeals, { data: deals, isFetching, isLoading, error }] = useLazyFetchDealsQuery()
    const [deleteDeal, { isLoading: deleteDealLoading, error: deleteDealError }] = useDeleteDealMutation()

    //SelectedItem
    const [selectedItem, setSelectedItem] = useState<Deal | null>(null)
    const resetSelectedItem = useCallback(() => setSelectedItem(null), [])

    //Filter
    const [filter, setFilter] = useState<UserFilter>('all')
    const params = useCallback(() => filter === 'user' ? { userId: user.id } : {}, [filter])
    const onChangeFilter = useCallback((value: UserFilter) => setFilter(value), [])

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
                fetchDeals(params())
            })
    }, [selectedRowKeys])

    useEffect(() => {
        fetchDeals(params())
    }, [params])

    return (
        <>
            <SelectedPageWrapper selectedItem={!!selectedItem} width={width}>
                <section className="main-section">
                    <ContractsToolbar
                        deleteDisable={!selectedRowKeys.length}
                        deleteLoading={deleteDealLoading}
                        filter={filter}
                        onChangeFilter={onChangeFilter}
                        onOpenCreate={showDrawer}
                        onDelete={onGroupDelete}
                        items={deals?.length}
                    />
                    <SmartTable<Deal>
                        columns={getDealsColumns(customers)}
                        dataSource={deals ?? []}
                        rowSelection={rowSelection}
                        loading={isFetching || isLoading}
                        scroll={{ x: 'max-content' }}
                        onRow={(record) => ({ onClick: () => setSelectedItem(record)})}
                    />
                    {!!error && <Alert message={JSON.stringify(error)} type="error" />}
                    {!!deleteDealError && <Alert message={JSON.stringify(deleteDealError)} type="error" />}
                </section>
                <ViewDealForm
                    selected={selectedItem}
                    onClose={resetSelectedItem}
                />
            </SelectedPageWrapper>
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
                <CreateDealForm
                    user={user}
                    closeDrawer={closeDrawer}
                    catalog={customers}
                />
            </Drawer>
        </>
    )
}

export default DealsPage