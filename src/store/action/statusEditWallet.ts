import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusWallet: false,
};

const statusWalletEditAction = createSlice({
  name: "statusWalletEdit",
  initialState,
  reducers: {
    setStatusWalletEdit: (state, action) => {
      // state.statusWallet = action.payload.statusWallet
      state.statusWallet = action.payload;
    },
  },
});

export default statusWalletEditAction.reducer;
export const { setStatusWalletEdit } = statusWalletEditAction.actions;
