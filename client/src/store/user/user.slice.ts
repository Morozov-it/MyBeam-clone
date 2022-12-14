import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@models/user"

const user: User | null = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_USER_KEY || 'user') ?? 'null')

interface InitialState {
    isAuth: boolean
    name: string | null
    email: string | null
    id: number | null
}

const initialState: InitialState = {
    isAuth: !!user,
    name: user?.name ?? null,
    email: user?.email ?? null,
    id: user?.id ?? null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.isAuth = true
            state.name = action.payload.name
            state.email = action.payload.email
            state.id = action.payload.id
        },
        logout: (state) => {
            localStorage.clear()
            state.isAuth = false
            state.name = null
            state.email = null
            state.id = null
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer