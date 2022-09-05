import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import { Route } from "@models/routes"
import {
    FileDoneOutlined,
    FileTextOutlined,
    ForkOutlined,
    HomeOutlined, 
    LoginOutlined,
    ReadOutlined,
    SettingOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons"
import PageInDevelopment from "@pages/PageInDevelopment"
import Login from "@pages/Login"
import Register from "@pages/Register"

const Home = lazy(() => import('../pages/Home'))
const Deals = lazy(() => import('../pages/contracts/deals/page'))
const Customers = lazy(() => import('../pages/contracts/Customers'))
const Operations = lazy(() => import('../pages/contracts/Operations'))
const UserSettings = lazy(() => import('../pages/UserSettings'))

export enum Routes {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    USER_SETTINGS = '/user-settings',
    CONTRACTS = '/contracts',
    CONTRACTS_DEALS = '/contracts/deals',
    CONTRACTS_CUSTOMERS = '/contracts/customers',
    CONTRACTS_OPERATIONS = '/contracts/operations',
    NOT_FOUND = "*",
}

// ATTENTION!!! DOES NOT CHANGE THE ORDER OF ARRAY ITEMS!
export const authRoutes: Route[] = [
    {
        path: Routes.HOME,
        element: <Home />,
        icon: <HomeOutlined />,
        title: 'Главная',
        innerLinks: []
    },
    {
        path: Routes.USER_SETTINGS,
        element: <UserSettings />,
        icon: <SettingOutlined />,
        title: 'Параметры',
        innerLinks: []
    },
    {
        path: Routes.CONTRACTS,
        element: <PageInDevelopment />,
        icon: <FileTextOutlined />,
        title: 'Контракты',
        innerLinks: [
            {
                path: Routes.CONTRACTS_DEALS,
                element: <Deals />,
                icon: <FileDoneOutlined />,
                title: 'Договоры',
                innerLinks: []
            },
            {
                path: Routes.CONTRACTS_CUSTOMERS,
                element: <Customers />,
                icon: <UserSwitchOutlined />,
                title: 'Заказчики',
                innerLinks: []
            },
            {
                path: Routes.CONTRACTS_OPERATIONS,
                element: <Operations />,
                icon: <ForkOutlined />,
                title: 'Рабочие процессы',
                innerLinks: []
            },
        ]
    },
]

export const publicRoutes: Route[] = [
    {
        path: Routes.LOGIN,
        element: <Login />,
        icon: <LoginOutlined />,
        title: 'Вход',
        innerLinks: []
    },
    {
        path: Routes.REGISTER,
        element: <Register />,
        icon: <ReadOutlined />,
        title: 'Регистрация',
        innerLinks: []
    },
    {
        path: Routes.NOT_FOUND,
        title: 'Страница не найдена',
        icon: null,
        element: <Navigate to={Routes.LOGIN} replace />,
        innerLinks: []
    },
]