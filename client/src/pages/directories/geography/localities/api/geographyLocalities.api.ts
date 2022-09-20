import { commonApi } from "@store/common.api"
import { GeographyLocality } from "../models"

export const geographyLocalitiesApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchLocalities: build.query<GeographyLocality[], string>({
            query: () => ({
                url: '/directoriesGeographyLocalities',
            }),
            providesTags: [{ type: 'GeographyLocalities', id: 'LIST' }],
        }),
        createLocality: build.mutation<GeographyLocality, Omit<GeographyLocality, 'id'>>({
            query: (created) => ({
                url: '/directoriesGeographyLocalities',
                method: 'POST',
                body: created,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            geographyLocalitiesApi.util.updateQueryData('fetchLocalities', '', draft => {
                                draft.push(data)
                            })
                        )
                    })
            },
        }),
        updateLocality: build.mutation<GeographyLocality, GeographyLocality>({
            query: (updated) => ({
                url: `/directoriesGeographyLocalities/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            geographyLocalitiesApi.util.updateQueryData('fetchLocalities', '', draft => {
                                let founded = draft.find(country => country.id === data.id)
                                !!founded && Object.assign(founded, data)
                            })
                        )
                    })
            },
        }),
        deleteLocality: build.mutation<{}, number>({
            query: (id) => ({
                url: `/directoriesGeographyLocalities/${id}`,
                method: 'DELETE',
            }),
            //refetch
            invalidatesTags: [{ type: 'GeographyLocalities', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateLocalityMutation,
    useDeleteLocalityMutation,
    useFetchLocalitiesQuery,
    useUpdateLocalityMutation,
} = geographyLocalitiesApi