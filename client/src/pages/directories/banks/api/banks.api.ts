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
            query: (newBank) => ({
                url: '/directoriesBanks',
                method: 'POST',
                body: newBank,
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
                                let bank = draft.find(bank => bank.id === data.id)
                                !!bank && Object.assign(bank, data)
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
            invalidatesTags: (result, error, arg) => !error ? [{ type: 'Banks', id: 'LIST' }] : [],
        }),
    }),
})

export const {
    useCreateBankMutation,
    useDeleteBankMutation,
    useFetchBanksQuery,
    useUpdateBankMutation
} = banksApi