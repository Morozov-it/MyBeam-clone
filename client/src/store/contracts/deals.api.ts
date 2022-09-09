import { Deal } from "@models/deals"
import { commonApi } from "@store/common.api"
import { userActions } from "@store/user/user.slice"

export const dealsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        //TODO: Think about separate into two different queries: allDeals & usersDeals!
        fetchDeals: build.query<Deal[], { userId?: number | null }>({
            query: ({ userId }) => ({
                url: `/deals${!!userId ? '?created_by.id=' + userId : ''}`,
            }),
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                queryFulfilled.then((data) => {})
                    .catch((data) => data.error.status === 401 && dispatch(userActions.logout()))
            },
            providesTags: [{ type: 'Deals', id: 'LIST' }],
        }),
        createDeal: build.mutation<Deal, Omit<Deal, 'id'>>({
            query: (newDeal) => ({
                url: '/deals',
                method: 'POST',
                body: newDeal,
            }),
            //refetch
            invalidatesTags: (result, error, arg) => !error ? [{ type: 'Deals', id: 'LIST' }] : [],
        }),
        updateDeal: build.mutation<Deal, { updated: Deal, userId?: number | null}>({
            query: ({ updated }) => ({
                url: `/deals/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            dealsApi.util.updateQueryData('fetchDeals', { userId }, draft => {
                                let deal = draft.find(deal => deal.id === data.id)
                                !!deal && Object.assign(deal, data)
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
        }),
    }),
})

export const {
    useCreateDealMutation,
    useDeleteDealMutation,
    useFetchDealsQuery,
    useUpdateDealMutation,
    useLazyFetchDealsQuery,
} = dealsApi