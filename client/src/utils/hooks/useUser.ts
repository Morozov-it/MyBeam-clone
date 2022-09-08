import { User } from "@models/user"
import { useAppSelector } from "@store/store"

export const useUser = () => {
    const user = useAppSelector((state) => ({
        id: state.user.id,
        name: state.user.name,
        email: state.user.email,
    } as User))

    return user
}