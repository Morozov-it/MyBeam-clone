import { useCallback, useState } from "react"

export const useTabs = (onClose: () => void) => {
    //Editing
    const [edit, setEdit] = useState<boolean>(true)
    const onEdit = useCallback(() => setEdit(false), [])
    const offEdit = useCallback(() => setEdit(true), [])

    //Tabs
    const [activeKey, setActiveKey] = useState<string>('1')
    const toggleActiveKey = useCallback((key: string) => setActiveKey(key), [])
    const onCloseTabs = useCallback(() => {
        offEdit()
        onClose()
    }, [offEdit, onClose])

    return {
        edit,
        onEdit,
        offEdit,
        activeKey,
        toggleActiveKey,
        onCloseTabs
    }
}