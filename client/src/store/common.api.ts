import { accessToken, baseURL } from '@api/base'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

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
    tagTypes: ['Contacts', 'User'],
    endpoints: _ => ({}),
    //keepUnusedDataFor: 1,
})