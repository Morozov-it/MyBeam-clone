import { commonApi } from "@store/common.api"
import { GeographyRegion } from "../models"

export const geographyRegionsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchRegions: build.query<GeographyRegion[], string>({
            query: () => ({
                url: '/directoriesGeographyRegions',
            }),
            providesTags: [{ type: 'GeographyRegions', id: 'LIST' }],
        }),
        createRegion: build.mutation<GeographyRegion, Omit<GeographyRegion, 'id'>>({
            query: (created) => ({
                url: '/directoriesGeographyRegions',
                method: 'POST',
                body: created,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            geographyRegionsApi.util.updateQueryData('fetchRegions', '', draft => {
                                draft.push(data)
                            })
                        )
                    })
            },
        }),
        updateRegion: build.mutation<GeographyRegion, GeographyRegion>({
            query: (updated) => ({
                url: `/directoriesGeographyRegions/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            geographyRegionsApi.util.updateQueryData('fetchRegions', '', draft => {
                                let founded = draft.find(founded => founded.id === data.id)
                                !!founded && Object.assign(founded, data)
                            })
                        )
                    })
            },
        }),
        deleteRegion: build.mutation<{}, number>({
            query: (id) => ({
                url: `/directoriesGeographyRegions/${id}`,
                method: 'DELETE',
            }),
            //refetch
            invalidatesTags: [{ type: 'GeographyRegions', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateRegionMutation,
    useDeleteRegionMutation,
    useUpdateRegionMutation,
    useFetchRegionsQuery,
} = geographyRegionsApi