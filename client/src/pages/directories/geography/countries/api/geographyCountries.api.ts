import { commonApi } from "@store/common.api"
import { GeographyCountry } from "../models"

export const geographyCountriesApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchCountries: build.query<GeographyCountry[], string>({
            query: () => ({
                url: '/directoriesGeographyCountries',
            }),
            providesTags: [{ type: 'GeographyCountries', id: 'LIST' }],
        }),
        createCountry: build.mutation<GeographyCountry, Omit<GeographyCountry, 'id'>>({
            query: (created) => ({
                url: '/directoriesGeographyCountries',
                method: 'POST',
                body: created,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            geographyCountriesApi.util.updateQueryData('fetchCountries', '', draft => {
                                draft.push(data)
                            })
                        )
                    })
            },
        }),
        updateCountry: build.mutation<GeographyCountry, GeographyCountry>({
            query: (updated) => ({
                url: `/directoriesGeographyCountries/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            geographyCountriesApi.util.updateQueryData('fetchCountries', '', draft => {
                                let founded = draft.find(founded => founded.id === data.id)
                                !!founded && Object.assign(founded, data)
                            })
                        )
                    })
            },
        }),
        deleteCountry: build.mutation<{}, number>({
            query: (id) => ({
                url: `/directoriesGeographyCountries/${id}`,
                method: 'DELETE',
            }),
            //refetch
            invalidatesTags: [{ type: 'GeographyCountries', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateCountryMutation,
    useDeleteCountryMutation,
    useFetchCountriesQuery,
    useUpdateCountryMutation,
} = geographyCountriesApi