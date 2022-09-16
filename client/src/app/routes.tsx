import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import { Route } from "@models/routes"
import {
    FileTextOutlined, 
    HomeOutlined, 
    LoginOutlined, 
    ReadOutlined, 
    SettingOutlined, 
} from "@ant-design/icons"
import PageInDevelopment from "@pages/PageInDevelopment"
import Login from "@pages/Login"
import Register from "@pages/Register"

const Home = lazy(() => import('../pages/Home'))
//const UserSettings = lazy(() => import('../pages/UserSettings'))
const SharedPage = lazy(() => import('../pages/SharedPage'))
//Contracts
const Deals = lazy(() => import('../pages/contracts/deals'))
const Customers = lazy(() => import('../pages/contracts/customers'))
const Operations = lazy(() => import('../pages/contracts/operations'))
//Directories
const DirectoriesBanks = lazy(() => import('../pages/directories/banks'))
const DirectoriesCompanyTypes = lazy(() => import('../pages/directories/companyTypes'))
const DirectoriesContractStatuses = lazy(() => import('../pages/directories/contractStatuses'))
const DirectoriesCostArticles = lazy(() => import('../pages/directories/costArticles'))
const DirectoriesDocumentTypes = lazy(() => import('../pages/directories/documentTypes'))
const DirectoriesGeographyCountries = lazy(() => import('../pages/directories/geography/countries'))
const DirectoriesGeographyLocalities = lazy(() => import('../pages/directories/geography/localities'))
const DirectoriesGeographyRegions = lazy(() => import('../pages/directories/geography/regions'))
const DirectoriesGphServices = lazy(() => import('../pages/directories/gphServices'))
const DirectoriesInOuComeArticles = lazy(() => import('../pages/directories/inOutComeArticles'))
const DirectoriesJobPositions = lazy(() => import('../pages/directories/jobPositions'))
const DirectoriesJobStatuses = lazy(() => import('../pages/directories/jobStatuses'))
const DirectoriesJobTypes = lazy(() => import('../pages/directories/jobTypes'))
const DirectoriesMeasures = lazy(() => import('../pages/directories/measures'))
const DirectoriesPurchaseKinds = lazy(() => import('../pages/directories/purchaseKinds'))
const DirectoriesServiceKinds = lazy(() => import('../pages/directories/serviceKinds'))
const DirectoriesSourceOfPersons = lazy(() => import('../pages/directories/sourceOfPersons'))
const DirectoriesStructureLegalEntities = lazy(() => import('../pages/directories/structure/legalEntities'))
const DirectoriesStructureObjects = lazy(() => import('../pages/directories/structure/objects'))
const DirectoriesStructureTerritories = lazy(() => import('../pages/directories/structure/territories'))
const DirectoriesStructureWorkRegions = lazy(() => import('../pages/directories/structure/workRegions'))
const DirectoriesTaxTypes = lazy(() => import('../pages/directories/taxTypes'))
const DirectoriesVacationKinds = lazy(() => import('../pages/directories/vacationKinds'))

export enum Routes {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    USER_SETTINGS = '/user-settings',
    NOT_FOUND = "*",
    //Contracts
    CONTRACTS = '/contracts',
    CONTRACTS_DEALS = '/contracts/deals',
    CONTRACTS_CUSTOMERS = '/contracts/customers',
    CONTRACTS_OPERATIONS = '/contracts/operations',
    //Directories
    DIRECTORIES = '/directories',
    DIRECTORIES_BANKS = '/directories/banks',
    DIRECTORIES_COMPANY_TYPES = '/directories/companyTypes',
    DIRECTORIES_CONTRACTS_STATUSES = '/directories/contractStatuses',
    DIRECTORIES_COST_ARTICLES = '/directories/costArticles',
    DIRECTORIES_DOCUMENT_TYPES = '/directories/documentTypes',
    DIRECTORIES_GEOGRAPHY = '/directories/geography',
    DIRECTORIES_GEOGRAPHY_COUNTRIES = '/directories/geography/countries',
    DIRECTORIES_GEOGRAPHY_LOCALITIES = '/directories/geography/localities',
    DIRECTORIES_GEOGRAPHY_REGIONS = '/directories/geography/regions',
    DIRECTORIES_GPH_SERVICES = '/directories/gphServices',
    DIRECTORIES_IN_OUT_COME_ARTICLES = '/directories/inOutComeArticles',
    DIRECTORIES_JOB_POSITIONS = '/directories/jobPositions',
    DIRECTORIES_JOB_STATUSES = '/directories/jobStatuses',
    DIRECTORIES_JOB_TYPES = '/directories/jobTypes',
    DIRECTORIES_MEASURES = '/directories/measures',
    DIRECTORIES_PURCHASE_KINDS = '/directories/purchaseKinds',
    DIRECTORIES_SERVICE_KINDS = '/directories/serviceKinds',
    DIRECTORIES_SOURCE_OF_PERSONS = '/directories/sourceOfPersons',
    DIRECTORIES_STRUCTURE = '/directories/structure',
    DIRECTORIES_STRUCTURE_LEGAL_ENTITIES = '/directories/structure/legalEntities',
    DIRECTORIES_STRUCTURE_OBJECTS = '/directories/structure/objects',
    DIRECTORIES_STRUCTURE_TERRITORIES = '/directories/structure/territories',
    DIRECTORIES_STRUCTURE_WORK_REGIONS = '/directories/structure/workRegions',
    DIRECTORIES_TAX_TYPES = '/directories/taxTypes',
    DIRECTORIES_VACATION_KINDS = '/directories/vacationKinds',
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
        element: <PageInDevelopment />,
        icon: <SettingOutlined />,
        title: 'Параметры',
        innerLinks: []
    },
    {
        path: Routes.CONTRACTS,
        element: <SharedPage />,
        icon: <FileTextOutlined />,
        title: 'Контракты',
        innerLinks: [
            {
                path: Routes.CONTRACTS_DEALS,
                element: <Deals />,
                icon: null,
                title: 'Договоры',
                innerLinks: []
            },
            {
                path: Routes.CONTRACTS_CUSTOMERS,
                element: <Customers />,
                icon: null,
                title: 'Заказчики',
                innerLinks: []
            },
            {
                path: Routes.CONTRACTS_OPERATIONS,
                element: <Operations />,
                icon: null,
                title: 'Рабочие процессы',
                innerLinks: []
            },
        ]
    },
    {
        path: Routes.DIRECTORIES,
        element: <SharedPage />,
        icon: <ReadOutlined />,
        title: 'Справочники',
        innerLinks: [
            {
                path: Routes.DIRECTORIES_STRUCTURE,
                element: <SharedPage />,
                icon: null,
                title: 'Структура',
                innerLinks: [
                    {
                        path: Routes.DIRECTORIES_STRUCTURE_LEGAL_ENTITIES,
                        element: <DirectoriesStructureLegalEntities />,
                        icon: null,
                        title: 'Юридические лица',
                        innerLinks: []
                    },
                    {
                        path: Routes.DIRECTORIES_STRUCTURE_WORK_REGIONS,
                        element: <DirectoriesStructureWorkRegions />,
                        icon: null,
                        title: 'Регионы работы',
                        innerLinks: []
                    },
                    {
                        path: Routes.DIRECTORIES_STRUCTURE_TERRITORIES,
                        element: <DirectoriesStructureTerritories />,
                        icon: null,
                        title: 'Территории',
                        innerLinks: []
                    },
                    {
                        path: Routes.DIRECTORIES_STRUCTURE_OBJECTS,
                        element: <DirectoriesStructureObjects />,
                        icon: null,
                        title: 'Объекты',
                        innerLinks: []
                    },
                ]
            },
            {
                path: Routes.DIRECTORIES_GEOGRAPHY,
                element: <SharedPage />,
                icon: null,
                title: 'География',
                innerLinks: [
                    {
                        path: Routes.DIRECTORIES_GEOGRAPHY_COUNTRIES,
                        element: <DirectoriesGeographyCountries />,
                        icon: null,
                        title: 'Страны',
                        innerLinks: []
                    },
                    {
                        path: Routes.DIRECTORIES_GEOGRAPHY_REGIONS,
                        element: <DirectoriesGeographyRegions />,
                        icon: null,
                        title: 'Регионы',
                        innerLinks: []
                    },
                    {
                        path: Routes.DIRECTORIES_GEOGRAPHY_LOCALITIES,
                        element: <DirectoriesGeographyLocalities />,
                        icon: null,
                        title: 'Населенные пункты',
                        innerLinks: []
                    },
                ]
            },
            {
                path: Routes.DIRECTORIES_BANKS,
                element: <DirectoriesBanks />,
                icon: null,
                title: 'Банки',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_PURCHASE_KINDS,
                element: <DirectoriesPurchaseKinds />,
                icon: null,
                title: 'Виды закупок',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_SERVICE_KINDS,
                element: <DirectoriesServiceKinds />,
                icon: null,
                title: 'Виды услуг',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_VACATION_KINDS,
                element: <DirectoriesVacationKinds />,
                icon: null,
                title: 'Виды отпусков',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_JOB_POSITIONS,
                element: <DirectoriesJobPositions />,
                icon: null,
                title: 'Должности',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_MEASURES,
                element: <DirectoriesMeasures />,
                icon: null,
                title: 'Единицы измерения',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_JOB_STATUSES,
                element: <DirectoriesJobStatuses />,
                icon: null,
                title: 'Статусы сотрудников',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_CONTRACTS_STATUSES,
                element: <DirectoriesContractStatuses />,
                icon: null,
                title: 'Статусы контрактов',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_JOB_TYPES,
                element: <DirectoriesJobTypes />,
                icon: null,
                title: 'Типы сотрудников',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_DOCUMENT_TYPES,
                element: <DirectoriesDocumentTypes />,
                icon: null,
                title: 'Типы документов',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_COMPANY_TYPES,
                element: <DirectoriesCompanyTypes />,
                icon: null,
                title: 'Типы контрагентов',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_TAX_TYPES,
                element: <DirectoriesTaxTypes />,
                icon: null,
                title: 'Типы налогооблажения',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_IN_OUT_COME_ARTICLES,
                element: <DirectoriesInOuComeArticles />,
                icon: null,
                title: 'Статьи доходов/расходов',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_COST_ARTICLES,
                element: <DirectoriesCostArticles />,
                icon: null,
                title: 'Статьи затрат на объектах',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_GPH_SERVICES,
                element: <DirectoriesGphServices />,
                icon: null,
                title: 'Услуги ГПХ',
                innerLinks: []
            },
            {
                path: Routes.DIRECTORIES_SOURCE_OF_PERSONS,
                element: <DirectoriesSourceOfPersons />,
                icon: null,
                title: 'Источники кадров',
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