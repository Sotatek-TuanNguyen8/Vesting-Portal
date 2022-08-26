import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusEmail: false,
};

const statusEmailEditAction = createSlice({
  name: "statusEmailEdit",
  initialState,
  reducers: {
    setStatusEmailEdit: (state, action) => {
      // state.statusEmail = action.payload.statusEmail
      state.statusEmail = action.payload;
    },
  },
});

export default statusEmailEditAction.reducer;
export const { setStatusEmailEdit } = statusEmailEditAction.actions;
