import React from 'react'
import { DataSelect } from '@components/controllers'
import { useFetchCustomersQuery } from '@store/contracts/customers.api'

const CustomersSelect: React.FC = () => {
    const { data, isFetching, isLoading } = useFetchCustomersQuery({})

    return (
        <DataSelect data={data ?? []} loading={isFetching || isLoading} />
    )
}

export default React.memo(CustomersSelect)