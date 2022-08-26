import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusTokenAmount: false,
};

const statusTokenAmountEditAction = createSlice({
  name: "statusTokenAmountEdit",
  initialState,
  reducers: {
    setStatusTokenAmountEdit: (state, action) => {
      // state.statusTokenAmount = action.payload.statusTokenAmount
      state.statusTokenAmount = action.payload;
    },
  },
});

export default statusTokenAmountEditAction.reducer;
export const { setStatusTokenAmountEdit } = statusTokenAmountEditAction.actions;
