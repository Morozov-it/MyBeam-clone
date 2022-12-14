import { commonApi } from "@store/common.api"
import { Bank } from "../models"

export const banksApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchBanks: build.query<Bank[], string>({
            query: () => ({
                url: '/directoriesBanks',
            }),
            providesTags: [{ type: 'Banks', id: 'LIST' }],
        }),
        createBank: build.mutation<Bank, Omit<Bank, 'id'>>({
            query: (created) => ({
                url: '/directoriesBanks',
                method: 'POST',
                body: created,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            banksApi.util.updateQueryData('fetchBanks', '', draft => {
                                draft.push(data)
                            })
                        )
                    })
            },
        }),
        updateBank: build.mutation<Bank, Bank>({
            query: (updated) => ({
                url: `/directoriesBanks/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            banksApi.util.updateQueryData('fetchBanks', '', draft => {
                                let founded = draft.find(founded => founded.id === data.id)
                                !!founded && Object.assign(founded, data)
                            })
                        )
                    })
            },
        }),
        deleteBank: build.mutation<{}, number>({
            query: (id) => ({
                url: `/directoriesBanks/${id}`,
                method: 'DELETE',
            }),
            //refetch
            invalidatesTags: [{ type: 'Banks', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateBankMutation,
    useDeleteBankMutation,
    useFetchBanksQuery,
    useUpdateBankMutation
} = banksApi