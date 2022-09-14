import { useCallback, useState } from "react"

export const useModal = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const showModal = useCallback(() => setIsModalVisible(true), [])
    const hideModal = useCallback(() => setIsModalVisible(false), [])

    return [
        isModalVisible,
        showModal,
        hideModal
    ] as [boolean, () => void, () => void]
}