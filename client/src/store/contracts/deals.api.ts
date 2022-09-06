import { Deal } from "@models/deals"
import { commonApi } from "@store/common.api"

export const dealsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchDeals: build.query<Deal[], number | undefined>({
            query: (userId) => ({
                url: '/deals',
                params: !!userId ? `created_by.id=${userId}` : {},
            }),
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Deals' as const, id })),
                    { type: 'Deals', id: 'LIST' },
                ]
                : [{ type: 'Deals', id: 'LIST' }],
        }),
        createDeal: build.mutation<Deal, Omit<Deal, 'id'>>({
            query: (newDeal) => ({
                url: '/deals',
                method: 'POST',
                body: newDeal,
            }),
            //refetch contacts
            invalidatesTags: [{ type: 'Deals', id: 'LIST' }],
        }),
        updateDeal: build.mutation<Deal, { updated: Deal, userId?: number}>({
            query: ({ updated }) => ({
                url: `/deals/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            async onQueryStarted({ updated, userId }, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        dispatch(
                            dealsApi.util.updateQueryData('fetchDeals', userId, draft => {
                                let deal = draft.find(deal => deal.id === updated.id)
                                !!deal && Object.assign(deal, updated)
                            })
                        )
                    })
                    .catch(() => {
                        console.error('dealsApi updateDeal error')
                    })
            },
        }),
        deleteDeal: build.mutation<{}, number>({
            query: (id) => ({
                url: `/deals/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Deals', id }],
        }),
    }),
})

export const {
    useCreateDealMutation,
    useDeleteDealMutation,
    useFetchDealsQuery,
    useUpdateDealMutation,
} = dealsApi