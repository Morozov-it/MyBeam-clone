import { Customer } from "@pages/contracts/customers/models"
import { commonApi } from "@store/common.api"
import { userActions } from "@store/user/user.slice"

export const customersApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchCustomers: build.query<Customer[], string>({
            query: () => ({
                url: '/customers',
            }),
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled.then((data) => {})
                    .catch((data) => data.error.status === 401 && dispatch(userActions.logout()))
            },
            providesTags: [{ type: 'Customers', id: 'LIST' }],
        }),
        createCustomer: build.mutation<Customer, Omit<Customer, 'id'>>({
            query: (newCustomer) => ({
                url: '/customers',
                method: 'POST',
                body: newCustomer,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            customersApi.util.updateQueryData('fetchCustomers', '', draft => {
                                draft.push(data)
                            })
                        )
                    })
            },
        }),
        updateCustomer: build.mutation<Customer, Customer>({
            query: (updated) => ({
                url: `/customers/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            onQueryStarted(_, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            customersApi.util.updateQueryData('fetchCustomers', '', draft => {
                                let customer = draft.find(customer => customer.id === data.id)
                                !!customer && Object.assign(customer, data)
                            })
                        )
                    })
            },
        }),
        deleteCustomer: build.mutation<{}, number>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
            //refetch
            invalidatesTags: (result, error, arg) => !error ? [{ type: 'Customers', id: 'LIST' }] : [],
        }),
    }),
})

export const {
    useCreateCustomerMutation,
    useDeleteCustomerMutation,
    useFetchCustomersQuery,
    useUpdateCustomerMutation,
    useLazyFetchCustomersQuery,
} = customersApi