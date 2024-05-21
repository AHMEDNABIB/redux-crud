import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transation/transactionSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
	
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		transaction: transactionReducer,
	},
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares().concat(apiSlice.middleware),
});
