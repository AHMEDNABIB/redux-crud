import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transation/transactionSlice";

export const store = configureStore({
	reducer: {
		transaction: transactionReducer,
	},
});
