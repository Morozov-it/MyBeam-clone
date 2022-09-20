/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useState } from "react"

export const useTable = <T,>() => {
    //SelectedItem
    const [selectedItem, setSelectedItem] = useState<T | null>(null)
    const changeSelectedItem = useCallback((value: T) => setSelectedItem(value), [])
    const resetSelectedItem = useCallback(() => setSelectedItem(null), [])

    //Row selection
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }, [])

    const rowSelection = useMemo(() => ({
        selectedRowKeys,
        onChange: onSelectChange,
    }), [onSelectChange, selectedRowKeys])

    const onRowClick = useCallback((record: T) => ({ onClick: () => changeSelectedItem(record) }), [])

    return {
        selectedItem,
        changeSelectedItem,
        resetSelectedItem,
        selectedRowKeys,
        setSelectedRowKeys,
        rowSelection,
        onRowClick,
    }
}