import { BaseDocFields } from "@models/base"
import { UserFilter } from "@models/user"
import { useCallback, useMemo, useState } from "react"

export const useUserFilter = <T extends BaseDocFields,>(userId: number, data?: T[]) => {
    const [userFilter, setUserFilter] = useState<UserFilter>('all')
    const toggleFilter = useCallback((value: UserFilter) => setUserFilter(value), [])

    const filteredEntities = useMemo(() => {
        if (!!data?.length) {
            return userFilter === 'user'
                ? data?.filter((entity) => entity.created_by.id === userId)
                : data
        } else {
            return []
        }
    }, [data, userFilter, userId])

    return { userFilter, toggleFilter, filteredEntities }
}