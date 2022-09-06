import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { accessToken } from '@api/base'
import { baseURL } from '@app/constants'

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json')
            headers.set('Authorization', accessToken)

            return headers
        },
    }),
    tagTypes: ['Deals', 'Customers', 'Operations', 'User'],
    endpoints: _ => ({}),
    //keepUnusedDataFor: 1,
})