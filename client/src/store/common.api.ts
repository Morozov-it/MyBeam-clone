import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { baseURL, STORAGE_TOKEN_KEY } from '@app/constants'

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json')
            headers.set('Authorization', 'Bearer ' + localStorage.getItem(STORAGE_TOKEN_KEY || ''))

            return headers
        },
    }),
    tagTypes: [
        //Contracts
        'Deals',
        'Customers',
        'Operations',
        //Directories
        'Banks',
        'CompanyTypes',
        'ContractStatuses',
        'CostArticles',
        'DocumentTypes',
        'GeographyCountries',
        'GeographyRegions',
        'GeographyLocalities',
        'GphServices',
        'InOutComeArticles',
        'JobPositions',
        'JobStatuses',
        'JobTypes',
        'Measures',
        'PurchaseKinds',
        'ServiceKinds',
        'SourceOfPersons',
        'StructureLegalEntities',
        'StructureObjects',
        'StructureTerritories',
        'StructureWorkRegions',
        'TaxTypes',
        'VacationKinds'
    ],
    endpoints: _ => ({}),
})