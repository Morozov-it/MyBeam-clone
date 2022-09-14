import { useCallback, useState } from "react"

export const useDrawer = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const showDrawer = useCallback(() => setOpenDrawer(true), [])
    const closeDrawer = useCallback(() => setOpenDrawer(false), [])

    return [
        openDrawer,
        showDrawer,
        closeDrawer
    ] as [boolean, () => void, () => void]
}