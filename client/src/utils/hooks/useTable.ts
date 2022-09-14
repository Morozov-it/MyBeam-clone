import { useCallback, useMemo, useState } from "react"

export const useTable = (cols: any[]) => {
    //SelectedItem
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const changeSelectedItem = useCallback((value: any) => setSelectedItem(value), [])
    const resetSelectedItem = useCallback(() => setSelectedItem(null), [])

    // Table
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }, [])

    const rowSelection = useMemo(() => ({
        selectedRowKeys,
        onChange: onSelectChange,
    }), [onSelectChange, selectedRowKeys])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onRowClick = useCallback((record: any) => ({ onClick: () => changeSelectedItem(record) }), [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = useMemo(() => cols, [])

    return {
        selectedItem,
        changeSelectedItem,
        resetSelectedItem,
        selectedRowKeys,
        setSelectedRowKeys,
        rowSelection,
        onRowClick,
        columns
    }
}