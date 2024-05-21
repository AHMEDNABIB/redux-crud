import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:9000/",
	}),
	tagTypes: ["Transactions", "Transaction"],
	endpoints: (builder) => ({
		getTransactions: builder.query({
			query: () => "transactions",
			keepUnusedDataFor: 600,
			providesTags: ["Transactions"],
		}),
		addTransaction: builder.mutation({
			query: (data) => ({
				url: "transactions",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Transactions"],
		}),
		editTransaction: builder.mutation({
			query: ({ id, data }) => ({
				url: `transactions/${id}`,
				method: "PATCH",
				body: data,
			}),
			// invalidatesTags: ["Transactions"],
			// invalidatesTags: (result, error, arg) => [
			// 	"Transactions",
			// 	{ type: "Transaction", id: arg.id },
			// ],

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				console.log(arg);
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getTransactions",
						undefined,
						(draft) => {
							const transactionToEdit = draft.find(
								(c) => c.id == arg.id
							);
							transactionToEdit.name = arg.data.name;
							transactionToEdit.type = arg.data.type;
							transactionToEdit.amount = arg.data.amount;
						})
                );
            try {
				await queryFulfilled;
			} catch {
				patchResult.undo();
			}
                
			},
		}),
		deleteTransaction: builder.mutation({
			query: ({ id }) => ({
				url: `transactions/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Transactions"],
		}),
	}),
});

export const {
	useGetTransactionsQuery,
	useAddTransactionMutation,
	useEditTransactionMutation,
	useDeleteTransactionMutation,
} = apiSlice;
