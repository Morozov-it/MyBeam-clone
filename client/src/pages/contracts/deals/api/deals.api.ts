import { Deal } from "@pages/contracts/deals/models"
import { commonApi } from "@store/common.api"
import { userActions } from "@store/user/user.slice"

export const dealsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchDeals: build.query<Deal[], string>({
            query: () => ({
                url: '/deals',
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
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
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            dealsApi.util.updateQueryData('fetchDeals', '', draft => {
                                draft.push(data)
                            })
                        )
                    })
            },
        }),
        updateDeal: build.mutation<Deal, Deal>({
            query: (updated) => ({
                url: `/deals/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            dealsApi.util.updateQueryData('fetchDeals', '', draft => {
                                let deal = draft.find(deal => deal.id === data.id)
                                !!deal && Object.assign(deal, data)
                            })
                        )
                    })
            },
        }),
        deleteDeal: build.mutation<{}, number>({
            query: (id) => ({
                url: `/deals/${id}`,
                method: 'DELETE',
            }),
            //refetch
            invalidatesTags: (result, error, arg) => !error ? [{ type: 'Deals', id: 'LIST' }] : [],
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