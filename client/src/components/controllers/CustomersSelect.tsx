import React from 'react'
import { SelectProps } from 'antd'
import { DataSelect } from '@components/controllers'
import { useFetchCustomersQuery } from '@store/contracts/customers.api'

const CustomersSelect: React.FC<SelectProps> = ({...props}) => {
    const { data, isFetching, isLoading } = useFetchCustomersQuery({})

    return (
        <DataSelect
            {...props}
            mode="multiple"
            data={data}
            loading={isFetching || isLoading}
        />
    )
}

export default React.memo(CustomersSelect)