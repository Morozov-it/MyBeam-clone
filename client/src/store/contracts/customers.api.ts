import { Customer } from "@models/customers"
import { commonApi } from "@store/common.api"

export const customersApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchCustomers: build.query<Customer[], { userId?: number }>({
            query: ({ userId }) => ({
                url: `/customers${!!userId ? '?created_by.id=' + userId : ''}`,
            }),
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Customers' as const, id })),
                    { type: 'Customers', id: 'LIST' },
                ]
                : [{ type: 'Customers', id: 'LIST' }],
        }),
        createCustomer: build.mutation<Customer, Omit<Customer, 'id'>>({
            query: (newCustomer) => ({
                url: '/customers',
                method: 'POST',
                body: newCustomer,
            }),
            //refetch contacts
            invalidatesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
        updateCustomer: build.mutation<Customer, { updated: Customer, userId?: number}>({
            query: ({ updated }) => ({
                url: `/customers/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            async onQueryStarted({ updated, userId }, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        dispatch(
                            customersApi.util.updateQueryData('fetchCustomers', { userId }, draft => {
                                let customer = draft.find(customer => customer.id === updated.id)
                                !!customer && Object.assign(customer, updated)
                            })
                        )
                    })
                    .catch(() => {
                        console.error('customersApi updateCustomer error')
                    })
            },
        }),
        deleteCustomer: build.mutation<{}, number>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Customers', id }],
        }),
    }),
})

export const {
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useFetchCustomersQuery
} = customersApi