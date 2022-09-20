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
            query: (newCountry) => ({
                url: '/directoriesGeographyCountries',
                method: 'POST',
                body: newCountry,
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
                                let country = draft.find(country => country.id === data.id)
                                !!country && Object.assign(country, data)
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
            invalidatesTags: (result, error, arg) => !error ? [{ type: 'GeographyCountries', id: 'LIST' }] : [],
        }),
    }),
})

export const {
    useCreateCountryMutation,
    useDeleteCountryMutation,
    useFetchCountriesQuery,
    useUpdateCountryMutation,
} = geographyCountriesApi