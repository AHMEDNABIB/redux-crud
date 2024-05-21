import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	editing: {},
};

// create slice
const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers: {
		editActive: (state, action) => {
			state.editing = action.payload;
		},
		editInActive: (state, action) => {
			state.editing = {};
		},
	},
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
