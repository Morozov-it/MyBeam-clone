import { BaseDocFields } from "@models/base"
import { UserFilter } from "@models/user"
import { useCallback, useMemo, useState } from "react"

export const useUserFilter = <T extends BaseDocFields,>(userId: number, data?: T[]) => {
    const [filter, setFilter] = useState<UserFilter>('all')
    const toggleFilter = useCallback((value: UserFilter) => setFilter(value), [])

    const filteredDeals = useMemo(() => {
        if (!!data?.length) {
            return filter === 'user'
                ? data?.filter((deal) => deal.created_by.id === userId)
                : data
        } else {
            return []
        }
    }, [data, filter, userId])

    return { filter, toggleFilter, filteredDeals }
}