import React from 'react'
import { useFetchBanksQuery } from './api/banks.api'

const Page: React.FC = () => {
    const { data } = useFetchBanksQuery('')
    return (
        <div>
            <span>Banks</span>
            <span>{JSON.stringify(data)}</span>
        </div>
    )
}

export default Page