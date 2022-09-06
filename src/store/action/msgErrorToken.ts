import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msgErrTokenAmount: "",
};

const msgErrTokenAmountEditAction = createSlice({
  name: "msgErrTokenAmountEdit",
  initialState,
  reducers: {
    setmsgErrTokenAmountEdit: (state, action) => {
      // state.msgErrTokenAmount = action.payload.msgErrTokenAmount
      state.msgErrTokenAmount = action.payload;
    },
  },
});

export default msgErrTokenAmountEditAction.reducer;
export const { setmsgErrTokenAmountEdit } = msgErrTokenAmountEditAction.actions;
